const { prisma } = require("../db/dbConfig");

// Get or create a cart for the authenticated user
const getOrCreateCart = async (userId) => {
  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      products: {
        include: {
          product: {
            include: { seller: { select: { id: true, name: true } } },
          },
        },
      },
    },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
      include: {
        products: {
          include: {
            product: {
              include: { seller: { select: { id: true, name: true } } },
            },
          },
        },
      },
    });
  }

  return cart;
};

const getCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user.userId);

    const total = cart.products.reduce((sum, item) => {
      const price = item.product.discountPrice ?? item.product.price;
      return sum + price * item.quantity;
    }, 0);

    return res.status(200).json({ cart, total });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    if (!productId) return res.status(400).json({ error: "productId is required" });

    const qty = parseInt(quantity);
    if (qty < 1) return res.status(400).json({ error: "quantity must be at least 1" });

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) return res.status(404).json({ error: "Product not found" });
    if (product.stock < qty) {
      return res.status(400).json({ error: "Insufficient stock" });
    }

    // Ensure the cart exists
    let cart = await prisma.cart.findUnique({ where: { userId: req.user.userId } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId: req.user.userId } });
    }

    // Upsert: if item already in cart, increment quantity
    const existing = await prisma.cartProduct.findUnique({
      where: { cartId_productId: { cartId: cart.id, productId } },
    });

    if (existing) {
      const newQty = existing.quantity + qty;
      if (product.stock < newQty) {
        return res.status(400).json({ error: "Insufficient stock for requested quantity" });
      }
      await prisma.cartProduct.update({
        where: { cartId_productId: { cartId: cart.id, productId } },
        data: { quantity: newQty },
      });
    } else {
      await prisma.cartProduct.create({
        data: { cartId: cart.id, productId, quantity: qty },
      });
    }

    const updatedCart = await getOrCreateCart(req.user.userId);
    const total = updatedCart.products.reduce((sum, item) => {
      const price = item.product.discountPrice ?? item.product.price;
      return sum + price * item.quantity;
    }, 0);

    return res.status(200).json({ message: "Item added to cart", cart: updatedCart, total });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const qty = parseInt(quantity);
    if (!qty || qty < 1) return res.status(400).json({ error: "quantity must be at least 1" });

    const cart = await prisma.cart.findUnique({ where: { userId: req.user.userId } });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const cartItem = await prisma.cartProduct.findUnique({
      where: { cartId_productId: { cartId: cart.id, productId } },
    });
    if (!cartItem) return res.status(404).json({ error: "Item not in cart" });

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (product.stock < qty) {
      return res.status(400).json({ error: "Insufficient stock" });
    }

    await prisma.cartProduct.update({
      where: { cartId_productId: { cartId: cart.id, productId } },
      data: { quantity: qty },
    });

    const updatedCart = await getOrCreateCart(req.user.userId);
    const total = updatedCart.products.reduce((sum, item) => {
      const price = item.product.discountPrice ?? item.product.price;
      return sum + price * item.quantity;
    }, 0);

    return res.status(200).json({ message: "Cart updated", cart: updatedCart, total });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await prisma.cart.findUnique({ where: { userId: req.user.userId } });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const cartItem = await prisma.cartProduct.findUnique({
      where: { cartId_productId: { cartId: cart.id, productId } },
    });
    if (!cartItem) return res.status(404).json({ error: "Item not in cart" });

    await prisma.cartProduct.delete({
      where: { cartId_productId: { cartId: cart.id, productId } },
    });

    return res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const cart = await prisma.cart.findUnique({ where: { userId: req.user.userId } });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    await prisma.cartProduct.deleteMany({ where: { cartId: cart.id } });

    return res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };

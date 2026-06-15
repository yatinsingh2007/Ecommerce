const { prisma } = require("../db/dbConfig");

const placeOrder = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        products: {
          include: { product: true },
        },
      },
    });

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // Validate stock for every item before creating the order
    for (const item of cart.products) {
      if (item.product.stock < item.quantity) {
        return res.status(400).json({
          error: `Insufficient stock for "${item.product.name}". Available: ${item.product.stock}`,
        });
      }
    }

    // Create order + order products + decrement stock + clear cart in a transaction
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId,
          products: {
            create: cart.products.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              finalPrice: (item.product.discountPrice ?? item.product.price) * item.quantity,
            })),
          },
        },
        include: {
          products: {
            include: { product: true },
          },
        },
      });

      // Decrement stock for each product
      for (const item of cart.products) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      // Clear the cart
      await tx.cartProduct.deleteMany({ where: { cartId: cart.id } });

      return newOrder;
    });

    return res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: "desc" },
      include: {
        products: {
          include: {
            product: {
              select: { id: true, name: true, imageUrl: true, category: true },
            },
          },
        },
      },
    });

    return res.status(200).json({ orders });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: {
        products: {
          include: { product: true },
        },
        user: { select: { id: true, name: true, email: true, phone: true, address: true } },
      },
    });

    if (!order) return res.status(404).json({ error: "Order not found" });

    // Users can only see their own orders
    if (req.user.role === "user" && order.userId !== req.user.userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    return res.status(200).json({ order });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: { products: true },
    });

    if (!order) return res.status(404).json({ error: "Order not found" });
    if (order.userId !== req.user.userId) {
      return res.status(403).json({ error: "Access denied" });
    }
    if (order.status !== "PENDING") {
      return res.status(400).json({ error: "Only PENDING orders can be cancelled" });
    }

    // Restore stock and cancel order in a transaction
    await prisma.$transaction(async (tx) => {
      for (const item of order.products) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { increment: item.quantity } },
        });
      }

      await tx.order.update({
        where: { id: req.params.id },
        data: { status: "CANCELLED" },
      });
    });

    return res.status(200).json({ message: "Order cancelled successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { placeOrder, getUserOrders, getOrderById, cancelOrder };

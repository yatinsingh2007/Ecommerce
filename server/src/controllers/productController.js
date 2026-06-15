const { prisma } = require("../db/dbConfig");

const getProducts = async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      search,
      page = 1,
      limit = 20,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const where = {};

    if (category) where.category = category;

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { tags: { has: search } },
      ];
    }

    const allowedSortFields = ["price", "rating", "createdAt", "name"];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";
    const sortOrder = order === "asc" ? "asc" : "desc";

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: { [sortField]: sortOrder },
        skip,
        take: limitNum,
        include: {
          seller: { select: { id: true, name: true } },
        },
      }),
      prisma.product.count({ where }),
    ]);

    return res.status(200).json({
      products,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: {
        seller: { select: { id: true, name: true, city: true, state: true } },
      },
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const {
      imageUrl, name, description, price, discountPrice,
      stock, category, dimensions, material, brand, tags,
    } = req.body;

    const product = await prisma.product.create({
      data: {
        imageUrl,
        name,
        description,
        price: parseFloat(price),
        discountPrice: discountPrice ? parseFloat(discountPrice) : null,
        stock: parseInt(stock),
        category,
        dimensions,
        material,
        brand,
        tags: tags || [],
        sellerId: req.user.userId,
      },
    });
    return res.status(201).json({ product });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const editProduct = async (req, res) => {
  try {
    const existing = await prisma.product.findUnique({ where: { id: req.params.id } });
    if (!existing) return res.status(404).json({ error: "Product not found" });
    if (existing.sellerId !== req.user.userId) {
      return res.status(403).json({ error: "You do not own this product" });
    }

    const {
      imageUrl, name, description, price, discountPrice,
      stock, category, dimensions, material, brand, tags,
    } = req.body;

    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: {
        ...(imageUrl !== undefined && { imageUrl }),
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(price !== undefined && { price: parseFloat(price) }),
        ...(discountPrice !== undefined && { discountPrice: discountPrice ? parseFloat(discountPrice) : null }),
        ...(stock !== undefined && { stock: parseInt(stock) }),
        ...(category !== undefined && { category }),
        ...(dimensions !== undefined && { dimensions }),
        ...(material !== undefined && { material }),
        ...(brand !== undefined && { brand }),
        ...(tags !== undefined && { tags }),
      },
    });
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    const existing = await prisma.product.findUnique({ where: { id: req.params.id } });
    if (!existing) return res.status(404).json({ error: "Product not found" });
    if (existing.sellerId !== req.user.userId) {
      return res.status(403).json({ error: "You do not own this product" });
    }

    await prisma.product.delete({ where: { id: req.params.id } });
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getProducts, getProduct, addProduct, editProduct, removeProduct };

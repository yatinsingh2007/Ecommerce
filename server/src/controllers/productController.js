const { prisma } = require("../db/dbConfig");
const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
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
    const product = await prisma.product.create({ data: req.body });
    return res.status(201).json({ product });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const editProduct = async (req, res) => {
  try {
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: req.body,
    });
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    await prisma.product.delete({
      where: { id: req.params.id },
    });
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  editProduct,
  removeProduct,
};

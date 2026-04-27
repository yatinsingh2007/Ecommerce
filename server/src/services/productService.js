const prisma = require("../config/db");

const getAllProducts = async () => {
  return await prisma.product.findMany({
    include: {
      seller: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
};

const getProductById = async (id) => {
  return await prisma.product.findUnique({
    where: { id },
    include: {
      seller: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
};

const createProduct = async (productData) => {
  return await prisma.product.create({
    data: productData,
  });
};

const updateProduct = async (id, productData) => {
  return await prisma.product.update({
    where: { id },
    data: productData,
  });
};

const deleteProduct = async (id) => {
  return await prisma.product.delete({
    where: { id },
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

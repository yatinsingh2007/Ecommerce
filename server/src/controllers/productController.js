const productService = require("../services/productService");
const { sendResponse } = require("../utils/response");

const getProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    return sendResponse(res, 200, "Products fetched successfully", products);
  } catch (error) {
    return sendResponse(res, 500, "Error fetching products", error.message);
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return sendResponse(res, 404, "Product not found");
    }
    return sendResponse(res, 200, "Product fetched successfully", product);
  } catch (error) {
    return sendResponse(res, 500, "Error fetching product", error.message);
  }
};

const addProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    return sendResponse(res, 201, "Product created successfully", product);
  } catch (error) {
    return sendResponse(res, 500, "Error creating product", error.message);
  }
};

const editProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    return sendResponse(res, 200, "Product updated successfully", product);
  } catch (error) {
    return sendResponse(res, 500, "Error updating product", error.message);
  }
};

const removeProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    return sendResponse(res, 200, "Product deleted successfully");
  } catch (error) {
    return sendResponse(res, 500, "Error deleting product", error.message);
  }
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  editProduct,
  removeProduct,
};

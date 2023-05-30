const express = require("express");
const router = express.Router();

const {
  getProductById,
  createProduct,
  getProduct,
  getAllUniqueCategories,
  updateProduct,
  deleteProduct,
  getProductPhoto,
  getAllProducts,
} = require("../Controller/product");
const { getUserById } = require("../Controller/user");
const {
  isSignedIn,
  isAuthenticated,
  islender,
} = require("../Controller/auth");

//params
router.param("userId", getUserById);
router.param("productId", getProductById);

//routes
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  islender,
  createProduct
);

router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", getProductPhoto);

router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  islender,
  deleteProduct
);

router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  islender,
  updateProduct
);

router.get("/products", getAllProducts);
router.get("/products/categories", getAllUniqueCategories);

module.exports = router;

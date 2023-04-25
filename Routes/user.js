const express = require("express");
const router = express.Router();

//imports
const {
  getUserById,
  getUser,
  updateUser,
  pushOrderInPurchaseList,
  userPurchaseList,
  getRentedProducts,
  getAddedProducts,
  getReviews,
  addReview
} = require("../Controller/user");
const {
  isSignedIn,
  isAuthenticated
} = require("../Controller/auth")

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

router.get("/user/purchase/:userId", isSignedIn, isAuthenticated, userPurchaseList);
router.get("/user/rented/:userId", isSignedIn, isAuthenticated, getRentedProducts);
router.get("/user/added/:userId", isSignedIn, isAuthenticated, getAddedProducts);

router.get("/product/reviews/:productId", isSignedIn, isAuthenticated, getReviews);
router.post("/product/review/:productId/:userId", isSignedIn, isAuthenticated, addReview);

router.put("/user/order/:userId", isSignedIn, isAuthenticated, pushOrderInPurchaseList);

module.exports = router;
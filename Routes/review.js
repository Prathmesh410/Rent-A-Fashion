const express = require( "express");
const router = express.Router();

const {getReviewById,createReview,updateReview,getAllReviewsByProduct,deleteReview} = require("../Controller/review")
const {getProductById} = require("../Controller/product")
const {getUserById} = require("../Controller/user")
const { isSignedIn, isAuthenticated, isAdmin ,islender} = require("../Controller/auth");


router.param("userId", getUserById);
router.param("productId", getProductById);
router.param("reviewId",getReviewById);

router.post("/review/addreview/:productId/:userId",isSignedIn, isAuthenticated, createReview)
router.put("/review/update/:reviewId/:userId",isSignedIn, isAuthenticated, updateReview)
router.delete("/review/delete/:reviewId/:userId",isSignedIn, isAuthenticated, deleteReview)
router.get("/review/getallreviews/:productId", getAllReviewsByProduct)
module.exports = router;
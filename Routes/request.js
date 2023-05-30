const express = require( "express");
const router = express.Router();

const {getRequestById,getAllRequest,createRequest,updateRequest,deleteRequest} = require('../Controller/request')
const {isSignedIn, isAuthenticated, isAdmin ,islender} = require('../Controller/auth')
const {getProductById} = require('../Controller/product')
const {getUserById} = require('../Controller/user')

router.param("userId", getUserById);
router.param("productId", getProductById);
router.param("requestId",getRequestById);

router.post("/product/request/:productId/:userId",isSignedIn, isAuthenticated, createRequest);
router.put("/product/request/updatestatus/:requestId/:userId",isSignedIn, isAuthenticated, updateRequest);
router.delete("/product/request/deleterequest/:requestId/:userId",isSignedIn, isAuthenticated, deleteRequest);


module.exports = router;
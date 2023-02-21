const express = require("express");
const router = express.Router();

//imports
const{getUserById,getUser } = require("../Controller/user")
const{isSignedIn,isAuthenticated,isAdmin} = require("../Controller/auth")

router.param("userId", getUserById);


router.get("/user/:userId" ,isSignedIn, isAuthenticated, getUser );


module.exports = router;
const express = require("express");
const router = express.Router();

//imports
const{getUserById,getUser,updateUser } = require("../Controller/user")
const{isSignedIn,isAuthenticated,isAdmin} = require("../Controller/auth")

router.param("userId", getUserById);


router.get("/user/:userId" ,isSignedIn, isAuthenticated, getUser );

router.put("/user/:userId" ,isSignedIn, isAuthenticated, updateUser  );
module.exports = router;
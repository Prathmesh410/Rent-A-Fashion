var express = require('express');
var router = express.Router();
const{signup,signin,signout,isSignedIn,isAdmin,isAuthenticated} =require("../Controller/auth");
const { check,validationResult } = require('express-validator');


router.post("/signup" ,
[ 
check("name").isLength({min : 3})
.withMessage("Name should be atleast 3 characters"),
check("email").isEmail()
.withMessage("Email is required"),
check("password").isLength({ min : 8})
.withMessage("Password should be atlest 8 charcters"),
],
signup);

router.post("/signin" , 
[
check("email").isEmail()
.withMessage("Email is required."),
check("password").isLength({ min : 3})
.withMessage("Password is Required."),
],
signin);

router.get("/signout" ,signout);

router.get("/testroute",isSignedIn,isAdmin,(req,res)=>{
    res.json({
        test :"User is signed in and Authenticated and admin"
    })
});


module.exports = router;
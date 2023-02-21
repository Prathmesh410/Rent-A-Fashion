const User = require("../models/user");
const { check,validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');



exports.signup = (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()[0].msg,
            location : errors.array()[0].param
        })
    };
    const user =  new User(req.body)
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err : "not able to save the user in DB"
            })
        }
        res.json({
            name : user.name,
            email : user.email,
            id : user._id
        });
    });
};

exports.signin = (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body;
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg
      });
    }
    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "USER email does not exists"
        });
      }
      if (!user.authetication(password)) {
        return res.status(401).json({
          error: "Email and password do not match"
        });
      }
      const token = jwt.sign({ _id: user._id },process.env.SECRET);
      res.cookie("token", token, { expire: new Date() + 9999 });
      const { _id, name, email, role ,rented_products,added_products,reviews } = user;
      return res.json({ token, user: { _id, name, email, role,rented_products,added_products,reviews } });
    });
  };

exports.signout = (req,res) => {
    res.clearCookie("token");
      res.json({
          message :"user signout sucsess."
      })
  };

// coustom middlewares for protected routes
exports.isSignedIn =  expressJwt({
  secret : process.env.SECRET,
  userProperty : "auth"
});

exports.isAuthenticated = (req,res,next) => {
  let cheaker = req.profile && req.auth && req.profile._id == req.auth._id;
  if(!cheaker){
   return res.status(403).json({
      error : "access denied"
    });
  }
  next()
};

exports.isAdmin = (req,res,next) => {
    if(req.profile.role === 'admin'){
      res.status(403).json({
        error : "Not An Admin"
      });
    }
  next()
};
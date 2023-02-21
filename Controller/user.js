const User = require("../models/user");

exports.getUserById = (req,res,next,id) => {
    User.findById(id).exec((err,user) => {
            if(err || !user){
                return res.status(400).json({
                    error : " no user is found"
                })
            };
            req.profile = user;
            next();
    });
};

exports.getUser = (req,res) => {
    //following info  is hide from showing
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    req.profile.__v = undefined;
    return res.json(req.profile);
};
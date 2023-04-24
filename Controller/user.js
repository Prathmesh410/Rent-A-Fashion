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

exports.updateUser = (req,res) =>{
    
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set : req.body },
        {new : true, useFindAndModify : false },
        (err, user) => {
            if(err){
                return res.status(400).json({
                    error : "You are not authorised or not sucessful"
                });
            }
            user.salt = undefined;
            user.encry_password = undefined;
            res.json(user);

        }
        
    );
    
};


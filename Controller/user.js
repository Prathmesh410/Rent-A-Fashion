const User = require("../models/user");
const Product = require("../Models/product")
const Order = require("../Models/order")
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

exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = [];
    req.body.order.products.forEach(product => {
      purchases.push({
        product: product._id,
        rentedAt: Date.now(),
        returnedAt: null
      });
    });
    User.findOneAndUpdate(
      { _id: req.profile._id },
      { $push: { rented_products: { $each: purchases } } },
      { new: true },
      (err, user) => {
        if (err) {
          return res.status(400).json({
            error: "Failed to update user's rented products list"
          });
        }
        next();
      }
    );
  };

  exports.userPurchaseList = (req, res) => {
    Order.find({ user: req.profile._id })
      .populate("user", "_id name")
      .exec((err, orders) => {
        if (err || !orders) {
          return res.status(400).json({
            error: "No orders found for this user"
          });
        }
        return res.json(orders);
      });
  };

  exports.getRentedProducts = (req, res) => {
    User.findById(req.profile._id)
      .populate("rented_products.product", "name description category price")
      .exec((err, user) => {
        if (err) {
          return res.status(400).json({
            error: "Could not find rented products for this user",
          });
        }
        return res.json(user.rented_products);
      });
  };

  exports.getAddedProducts = (req, res) => {
    const userId = req.profile._id;
  
    Product.find({ addedBy: userId })
      .populate('addedBy', '_id name')
      .exec((err, products) => {
        if (err) {
          return res.status(400).json({
            error: 'No products found for this user',
          });
        }
  
        res.json(products);
      });
  };


  exports.getReviews = (req, res) => {
    Product.findById(req.params.productId)
      .populate({
        path: 'reviews',
        populate: {
          path: 'user',
          select: 'name'
        }
      })
      .exec((err, product) => {
        if (err || !product) {
          return res.status(400).json({
            error: 'Product not found'
          })
        }
        res.json(product.reviews)
      })
  }

  exports.addReview = (req, res) => {
    const { rating, comment } = req.body
    const review = {
      user: req.profile._id,
      rating: rating,
      comment: comment
    }
    Product.findByIdAndUpdate(
      req.params.productId,
      { $push: { reviews: review } },
      { new: true, useFindAndModify: false },
      (err, product) => {
        if (err) {
          return res.status(400).json({
            error: 'Failed to add review'
          })
        }
        res.json(product.reviews)
      }
    )
  }

  exports.updateAddedProducts = (userId, productId) => {
    User.findByIdAndUpdate(
      userId,
      { $push: { added_products: productId } },
      { new: true },
      (err, user) => {
        if (err) {
          console.log("Failed to update user: ", err);
        }
        console.log("User updated successfully: ", user);
      }
    );
  };
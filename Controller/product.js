const category = require("../Models/category");
const Product = require("../Models/product");
const {updateAddedProducts} = require("../Controller/user")
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const router = require("../Routes/product");
const { parseInt } = require("lodash");


exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
      .populate("category") // populate the category field in the product object
      .exec((err, product) => {
        if (err) {
          return res.status(400).json({
            error: "Product not found",
          });
        }
        req.product = product;
        next();
      });
  };

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Problem with image",
        });
      }
  
      // Destructure the fields
      const { name, description,category, rent,deposite } = fields;
  
      if (!name || !description || !category || !rent || !deposite) {
        return res.status(400).json({
          error: "Please include all fields",
        });
      }
  
      let product = new Product(fields);
  
      // Handle product photos
      if (files.photos) {
        if (Array.isArray(files.photos)) {
          files.photos.forEach((photo) => {
            if (photo.size > 3000000) {
              return res.status(400).json({
                error: "File size too big!",
              });
            }
            product.photos.push({
              data: fs.readFileSync(photo.path),
              contentType: photo.type,
            });
          });
        } else {
          if (files.photos.size > 3000000) {
            return res.status(400).json({
              error: "File size too big!",
            });
          }
          product.photos.push({
            data: fs.readFileSync(files.photos.path),
            contentType: files.photos.type,
          });
        }
      }
      // Save to the DB
      product.save((err, product) => {
        if (err) {
          return res.status(400).json({
            error: "Saving product in DB failed",
          });
        }

        const userId = req.profile._id;
        const productId = product._id;
        updateAddedProducts(userId, productId);
        res.json(product);
      });
    });
  };


  exports.getProduct = (req, res) => {
    const productId = req.params.productId;
  
    Product.findById(productId)
      .populate('category', '_id name')
      .exec((err, product) => {
        if (err || !product) {
          return res.status(400).json({
            error: 'Product not found'
          });
        }
        res.json(product);
      });
  };

  exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    Product.find()
      .select("-photo")
      .populate("category")
      .sort([[sortBy, "asc"]])
      .limit(limit)
      .exec((err, products) => {
        if (err) {
          return res.status(400).json({
            error: "No products found",
          });
        }
        res.json(products);
      });
  };

exports.getProductPhoto = (req, res, next) => {
  if (req.product.photos && req.product.photos.length > 0) {
    req.product.photos.forEach((photo) => {
      if (photo.data) {
        res.write(photo.data);
      }
    });
    res.end();
  } else {
    next();
  }
};


  exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete the product",
        });
      }
      res.json({
        message: "Deletion was a success",
        deletedProduct,
      });
    });
  };


  exports.updateProduct = (req, res) => {
    const productId = req.product._id;
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Problem with image",
        });
      }
  
      // Update the product fields
      let updateFields = _.cloneDeep(fields);
      if (files.photo) {
        if (files.photo.size > 3000000) {
          return res.status(400).json({
            error: "File size too big!",
          });
        }
        updateFields.photo = {
          data: fs.readFileSync(files.photo.path),
          contentType: files.photo.type,
        };
      }
      Product.findByIdAndUpdate(productId, updateFields, { new: true }, (err, product) => {
        if (err || !product) {
          return res.status(400).json({
            error: "Updation of product failed",
          });
        }
        res.json(product);
      });
    });
  };
  
  exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("category", {}, (err, categories) => {
      if (err) {
        return res.status(400).json({
          error: "No categories found",
        });
      }
      res.json(categories);
    });
  };

  exports.updateAddedReview = (reviewId, productId) => {
    Product.findByIdAndUpdate(
      productId,
      { $push: { review: reviewId } },
      { new: true },
      (err, user) => {
        if (err) {
          console.log("Failed to add Product Review", err);
        }
        console.log("Review added successfully", user);
      }
    );
  };

  exports.updateAddedRequest = (requestId, productId) => {
    Product.findByIdAndUpdate(
      productId,
      { $push: { requests: requestId } },
      { new: true },
      (err, product) => {
        if (err) {
          console.log("Failed to add Request to Product", err);
        }
        console.log("Request added to Product successfully", product);
      }
    );
  };

  exports.removeReview = (reviewId, productId) => {
    Product.findByIdAndUpdate(
      productId,
      { $pull: { review: reviewId } },
      { new: true },
      (err, product) => {
        if (err) {
          return res.status(400).json({
            error: "Failed to remove review from product",
          });
        }
        console.log("Review removed")
      }
    );
  };

  exports.removeAddedRequest = (requestId, productId) => {
    Product.findByIdAndUpdate(
      productId,
      { $pull: { requests: requestId } },
      { new: true },
      (err, product) => {
        if (err) {
          return res.status(400).json({
            error: "Failed to remove request from product",
          });
        }
        console.log("Request removed")
      }
    );
  };



 
  
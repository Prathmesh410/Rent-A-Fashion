const Review = require("../Models/review")
const {updateAddedReview,removeReview} = require("./product")

exports.getReviewById = (req, res, next, id) => {
  Review.findById(id)
    .populate('user', 'name')
    .exec((err, review) => {
      if (err || !review) {
        return res.status(404).json({
          error: 'Review not found',
        });
      }
      req.review = review;
      next();
    });
};



exports.createReview = (req, res) => {
    const { rating, reviewText } = req.body;
    const { userId, productId } = req.params;
  
    const review = new Review({
      user: userId,
      rating,
      reviewText,
      product: productId
    });
  
    review.save((err, review) => {
      if (err) {
        return res.status(400).json({
          error: 'Failed to create review'
        });
      }
      const reviewId = review._id;
      updateAddedReview(reviewId,productId);
      res.status(201).json(review);
    });
  };

  exports.updateReview = (req, res) => {
    const { rating, reviewText } = req.body;
    Review.findByIdAndUpdate(
      req.params.reviewId,
      { rating, reviewText },
      { new: true, useFindAndModify: false },
      (err, review) => {
        if (err) {
          return res.status(400).json({
            error: 'Failed to update review'
          });
        }
        res.json(review);
      }
    );
  };
  exports.deleteReview = (req, res) => {
    Review.findByIdAndDelete(
      req.params.reviewId,
      { useFindAndModify: false },
      (err, review) => {
        if (err || !review) {
          return res.status(400).json({
            error: 'Failed to delete review'
          });
        }
        const reviewId = review._id;
        removeReview(reviewId,req.params.reviewId)
        res.json({
            
          message: 'Review deleted successfully'
        });
      }
    );
  };
  exports.getAllReviewsByProduct = (req, res) => {
    Review.find({ product: req.params.productId })
      .populate('user', '_id name') 
      .exec((err, reviews) => {
        if (err) {
          return res.status(400).json({
            error: 'Failed to get reviews'
          });
        }
        res.json(reviews);
      });
  };
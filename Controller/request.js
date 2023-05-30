const Request = require('../Models/request');
const {updateAddedRequest,removeAddedRequest} = require('../Controller/product')
exports.getRequestById = (req, res, next, id) => {
  Request.findById(id).exec((err, request) => {
    if (err || !request) {
      return res.status(400).json({
        error: 'Request not found in DB',
      });
    }
    req.request = request;
    next();
  });
};


exports.createRequest = (req, res) => {
    const { userId,productId } = req.params;
    const newRequest = new Request({
        borrower:userId,
        status:"requested",
    });
    newRequest.save((err, request) => {
      if (err) {
        return res.status(400).json({
          error: 'Failed to create request',
        });
      }
      const requestId = request._id;
      updateAddedRequest(requestId,productId);
      res.status(201).json(request);
    });
  };



  exports.updateRequest = (req, res) => {
    const requestId = req.params.requestId;
    Request.findByIdAndUpdate(
      requestId,
      { $set: req.body },
      { new: true },
      (err, request) => {
        if (err) {
          return res.status(400).json({
            error: 'Failed to update request',
          });
        }
        res.json(request);
      }
    );
  };

exports.deleteRequest = (req, res) => {
  const requestId = req.params.requestId;
  const productId = req.params.productId;
  Request.findByIdAndRemove(requestId, (err, request) => {
    if (err || !request) {
      return res.status(404).json({
        error: 'Request not found',
      });
    }
    removeAddedRequest(requestId,productId)
    res.json({
      message: 'Request deleted successfully',
    });
  });
};

exports.getAllRequest = (req, res) => {
    Request.find()
      .exec((err, requests) => {
        if (err) {
          return res.status(400).json({
            error: 'Failed to fetch requests',
          });
        }
        res.json(requests);
      });
  };

const Category = require("../Models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found in Db",
      });
    }
    req.category = cate;
    next();
  });
};

exports.createCategory = (req, res) => {
  const { name, size, season, gender } = req.body;

  // Check if all fields are provided
  if (!name || !size || !season || !gender) {
    return res.status(400).json({
      error: "Please include all fields",
    });
  }

  const category = new Category({ name, size, season, gender });

  category.save((err, savedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to save category",
      });
    }
    res.json({
      _id: savedCategory._id,
      name: savedCategory.name,
    });
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "Error getting categories",
      });
    }
    res.json(categories || []);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;

  // Check if at least one field is provided
  if (!req.body.name && !req.body.size && !req.body.season && !req.body.gender) {
    return res.status(400).json({
      error: "Please provide at least one field to update",
    });
  }

  category.name = req.body.name || category.name;
  category.size = req.body.size || category.size;
  category.season = req.body.season || category.season;
  category.gender = req.body.gender || category.gender;

  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update category",
      });
    }
    res.json(updatedCategory);
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;
  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete category",
      });
    }
    res.json({
      message: "Deleted category",
    });
  });
};

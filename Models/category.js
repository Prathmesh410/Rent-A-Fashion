const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    season: {
      type: String,
      trim: true,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
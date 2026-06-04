const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a category name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Category name too long']
    },
    description: {
      type: String,
      maxlength: [200, 'Description too long']
    },
    image: {
      type: String,
      default: 'category-default.jpg'
    }
  },
  { timestamps: true }
);

// Prevent duplicate model registration
const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

module.exports = Category;

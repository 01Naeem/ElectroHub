const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productCode: {
    type: String,
    required: true,
    // unique: true,
    trim: true,
  },
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  productCategory: {
    type: String,
    required: true,
    enum: [
      'mobile', 'mobiles', 'laptop', 'tablet', 'tv', 'camera', 'headphones', 'smartwatch',
      'gaming', 'home-appliances', 'wearables', 'storage', 'computer-accessories',
      'networking', 'audio', 'printers', 'security', 'smart-home', 'electronic-components',
      'power-banks', 'chargers', 'drones', 'projectors', 'earphones', 'others'
    ]
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  discountPrice: {
    type: Number,
    min: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  productImages: {
    type: [String], // ✅ Corrected: array of image URLs
    default: []
  },
  defaultImage: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);

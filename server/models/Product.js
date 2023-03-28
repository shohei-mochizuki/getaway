const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  departure: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  allinclusive: {
    type: Boolean,
    required: true,
  },
  activities: {
    type: Boolean,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

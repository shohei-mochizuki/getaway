const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  packageId: {
    type: String,
    required: true,
  },
  name: {
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
  country: {
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
  quantity: {
    type: Number,
    min: 0,
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

// Convert seeding data of departure ("yyyy-mm-dd") into a Data type
productSchema.departure instanceof Date;

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

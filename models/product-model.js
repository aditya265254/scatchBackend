const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  image: String,
  name: String,
  price: Number,
  disscount: {
    type: Number,
    default: 0
  },
  bgColor: String,
  panelColor: String,
  textColor: String,
})

module.exports = mongoose.model('product', productSchema )
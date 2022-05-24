const mongoose = require("mongoose");

const product_schema = new mongoose.Schema({
  title: { type: String },
  image: [{ type: String }],
  price: { type: Number },
  offer: { type: Number },
  color: { type: String },
  size: [{ type: String }],
  gender: { type: String },
  type: { type: String },
});

module.exports = mongoose.model("Product", product_schema);

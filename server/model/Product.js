const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  hits: { type: Number, default: 0 },
});

module.exports.Product = mongoose.model("Product", productSchema);

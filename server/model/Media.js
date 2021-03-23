const mongoose = require("mongoose");

const { Schema } = mongoose;

const MediaSchema = new Schema({
  name: { type: String, required: true },
  poster: { type: String },
  filename: { type: String, required: true },
  categoryname: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  description: { type: String },
});

module.exports.Media = mongoose.model("Media", MediaSchema);

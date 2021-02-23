const mongoose = require('mongoose');

const { Schema } = mongoose;

const videoSchema = new Schema({
    name: { type: String, required: true },
    poster: { type: String, required: true },
    filename: { type: String, required: true },
    categoryname: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
});

module.exports.Video = mongoose.model('Video', videoSchema);
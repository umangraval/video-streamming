const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
    name: { type: String, required: true },
});

module.exports.Category = mongoose.model('Category', categorySchema);
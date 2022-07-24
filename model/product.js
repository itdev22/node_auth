const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, default: null },
    type: { type: String, default: null },
    count: { type: Number },
    price: { type: Number }
}, { timestamps: {} });

module.exports = mongoose.model("product", productSchema);
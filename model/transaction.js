const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new mongoose.Schema({
    user_id: { type: Schema.Types.ObjectID, ref: 'user' },
    product_id: { type: Schema.Types.ObjectID, ref: 'product' },

}, { timestamps: {} });





module.exports = mongoose.model("transaction", transactionSchema);
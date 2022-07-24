const Product = require('../model/product');
const apiresponse = require('./apirespose');


exports.Product_getall = async (rerq, res) => {
    const data = await Product.find();

    res.json(apiresponse.response(data, 'Success'));
}

exports.Product_create = async (req, res) => {
    const { name, type, count, price } = req.body;

    const data = await Product.create({
        name,
        type,
        count,
        price
    });

    res.json(apiresponse.response(req.body, 'Success'));
}
exports.Product_delete = async (req, res) => {
    const { id } = req.body;

    const data = await Product.deleteOne({ _id: id });

    res.json(apiresponse.response(req.body, 'Success'));
}
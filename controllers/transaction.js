const Transaction = require('../model/transaction');
const User = require('../model/user');
const Product = require('../model/product');
const apiresponse = require('./apirespose');

exports.Transaction_getall = async (req, res) => {
    // const data = await Transaction.aggregate([{
    //     $lookup:
    //     {
    //         from: 'users',
    //         localField: '',
    //         foreignField: '',
    //         as: 'users'
    //     }
    // },
    // {
    //     $lookup:
    //     {
    //         from: 'products',
    //         localField: 'id',
    //         foreignField: 'product_id',
    //         as: 'products'
    //     }
    // }]);

    const data = await Transaction.find().populate(['user_id', 'product_id']).exec();


    res.json(apiresponse.response(data, 'success'))
}
exports.Transaction_create = async (req, res) => {

    const { iduser, idproduct } = req.body;

    if (!(iduser && idproduct)) {
        res.json('must be fill')
    }
    // const userdata = await User.find({ _id: req.body.iduser }).then(function (response) {
    //     return response
    // }).catch(function (err) { return err })
    // const productdata = await Product.find({ _id: req.body.idproduct }).catch(function (err) { return err })
    const user_id = iduser;
    const product_id = idproduct;
    const data = await Transaction.create({
        user_id,
        product_id
    });

    console.log(iduser);
    console.log(idproduct);
    // var data = {};
    // data.userdata = userdata;
    // data.productdata = productdata;

    res.json(apiresponse.response(data, 'success'))
}
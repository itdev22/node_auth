var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const productController = require('../controllers/product');
const auth = require('../middleware/auth');

/* GET users listing. */
router.get('/', productController.Product_getall);
router.post('/store', productController.Product_create);
router.post('/delete', productController.Product_delete);


module.exports = router;

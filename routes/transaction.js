var express = require('express');
var router = express.Router();
const transaction = require('../controllers/transaction');

router.get('/', transaction.Transaction_getall);
router.post('/post', transaction.Transaction_create);

module.exports = router;
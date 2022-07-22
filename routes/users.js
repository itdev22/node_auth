var express = require('express');
var router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { User_register, User_login } = require('../controllers/users');
const auth = require('../middleware/auth');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', User_login)
router.post("/register", User_register);
router.get('/sudahlogin', auth, function (req, res) {
  console.log(req);
  res.send('successfull Login' + req);
})

module.exports = router;

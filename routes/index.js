var express = require('express');
var router = express.Router();
const io = require("socket.io")();
const socketApi = {
  io,
};

/* GET home page. */
router.get('/', function (req, res, next) {
  // io.emit('chat message', req.headers['']);
  res.render('index', { title: 'Express' });

});

module.exports = router;

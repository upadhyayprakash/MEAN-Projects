var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express is Cool', condition:(5>3), myArr:[4,5,6]});
});

module.exports = router;

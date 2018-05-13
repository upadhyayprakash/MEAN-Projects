var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express is Cool', condition:(5>3), myArr:[4,5,6]});
});

router.get('/test/:id', function(req, res, next) {
  res.render('testget', { output:req.params.id, title: 'Get with Parameter', condition:(5>3), myArr:[4,5,6]});
});


router.get('/testpost/:id', function(req, res, next) {
  res.render('testpost', { output:req.params.id, title: 'POST with Parameter', condition:(5>3), myArr:[4,5,6]});
});

router.post('/test/submit', function(req, res, next) {
  var id = req.body.id;
  res.redirect('/testpost/'+id);
});

module.exports = router;

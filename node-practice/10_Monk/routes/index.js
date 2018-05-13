var express = require('express');
var router = express.Router();
var db = require('monk')('localhost:27017/test');
var userData = db.get('user-data');

var url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req, res, next){
	
	var data = userData.find({}).then((docs)=>{res.render('index', {items:docs});console.log('All Data Loaded...')});
	// data.on('success', function(docs){
		// res.render('index',{items:docs});
		// console.log('All Data Retrieved...');
	// });
});

router.post('/insert', function(req, res, next){
	var item = {
			title: req.body.title,
			content: req.body.content,
			author:req.body.author
		};
	
	var insert = userData.insert(item).then(()=>{console.log('Data Inserted Successfully...');});
	// insert.on('success', function(){
		// console.log('Data Inserted Successfully...');
	// });
	
	
	res.redirect('/');
});

router.post('/update', function(req, res, next){
	var item = {
			title: req.body.title,
			content: req.body.content,
			author:req.body.author
		};
	
	var id = req.body.id;
	
	userData.update({"_id": db.id(id)}, item).then(()=>{console.log('Record Updated...');});// One Method
	
	//var updRecords = userData.updateById(id, item).then(()=>{console.log('Record Updated...');}); // Easier method
	
	// You can assign the above call to a variable and attach a callback
	// updRecords.on('success', function(){
		// console.log("Record Updated...");
	// });
	
	res.redirect('/');
});

router.post('/delete', function(req, res, next){
	var id = req.body.id;
	
	userData.remove({"_id":db.id(id)}).then(()=>{console.log('Recrod Deleted...');}); // One Method
	
	//var delRecords = userData.removeById(id).then(()=>{console.log('Record Deleted...');}); // Easier Method, but Not Working now
	
	// You can assign the above call to a variable and attach a callback
	// delRecords.on('success', function(){
		// console.log("Record Deleted...");
	// });
	
	res.redirect('/');
});

module.exports = router;

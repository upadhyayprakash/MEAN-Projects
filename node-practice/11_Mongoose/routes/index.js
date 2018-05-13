var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// Establish the Connection
mongoose.connect('localhost:27017/test');
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
	title:{type:String, required:true},
	content: String,
	author:String
}, {collection:'user-data'});

var UserData = mongoose.model('UserData', userDataSchema);

var url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req, res, next){
	
	UserData.find().then(function(doc){
		res.render('index', {items:doc});
		console.log('All Records Loaded...');
	});
	
});

router.post('/insert', function(req, res, next){
	var item = {
			title: req.body.title,
			content: req.body.content,
			author:req.body.author
		};
	
	var data = new UserData(item);
	
	data.save(); // This will insert into the Database
	console.log('Record Inserted...');
	res.redirect('/');
});

router.post('/update', function(req, res, next){
	var item = {
			title: req.body.title,
			content: req.body.content,
			author:req.body.author
		};
	
	var id = req.body.id;
	
	UserData.findById(id, function(err, doc){
		if(err)
		{
			console.log('Error while Updating("No Entry Found")');
		}
		doc.title = req.body.title;
		doc.content = req.body.content;
		doc.author = req.body.author;
		doc.save();
		console.log('Record Udpated...');
	});
	
	res.redirect('/');
});

router.post('/delete', function(req, res, next){
	var id = req.body.id;
	
	UserData.findByIdAndRemove(id).exec();
	console.log('Record Deleted...');
	res.redirect('/');
});

module.exports = router;

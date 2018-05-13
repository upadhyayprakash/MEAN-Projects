var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req, res, next){
	var resultArr = [];
	mongo.connect(url, function(err, db){
		assert.equal(null, err);
		var cursor = db.collection('user-data').find();
		cursor.forEach(function(doc, err){
			assert.equal(null, err);
			resultArr.push(doc);
		}, function(){
			db.close();
			res.render('index', {items:resultArr});
		});
	});
});

router.post('/insert', function(req, res, next){
	var item = {
			title: req.body.title,
			content: req.body.content,
			author:req.body.author
		};
	
	mongo.connect(url, function(err, db){
		assert.equal(null,err);
		db.collection('user-data').insertOne(item, function(err, result){
			assert.equal(null, err);
			console.log("Item Inserted to 'test' DB...");
			db.close();
		});
	});
	
	res.redirect('/');
});

router.post('/update', function(req, res, next){
	var item = {
			title: req.body.title,
			content: req.body.content,
			author:req.body.author
		};
	
	var id = req.body.id;
	
	mongo.connect(url, function(err, db){
		assert.equal(null,err);
		db.collection('user-data').updateOne({"_id":objectId(id)}, {$set:item}, function(err, result){
			assert.equal(null, err);
			console.log("Item Updated in 'test' DB...");
			db.close();
		});
	});
	
	res.redirect('/');
});

router.post('/delete', function(req, res, next){
	var id = req.body.id;
	
	mongo.connect(url, function(err, db){
		assert.equal(null,err);
		db.collection('user-data').deleteOne({"_id":objectId(id)}, function(err, result){
			assert.equal(null, err);
			console.log("Item Deleted from 'test' DB...");
			db.close();
		});
	});
	
	res.redirect('/');
});

module.exports = router;

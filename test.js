var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	fs = require('fs'), 
	MongoClient = require('mongodb').MongoClient;
var db;
var answ = new Array();

// opens database connection
MongoClient.connect("mongodb://localhost:27017/orgDB", function(err, database) {
	if(err) { return console.dir(err); }
	db = database
	app.listen(3000, () => {
	})
}); 

// to use bodyparser
app.use(bodyParser.json());

// for website main page
app.get('/', function (req, res) {
	fs.readFile('./views/frontpage.html', 'utf-8', function (err, data) {
		if (err) {
			return console.log(err);
		}
		res.send(data);
		db.collection('organizations').find().toArray(function(err, results) {
			console.log(results)
		});
	});
})

// for website post page
app.get('/add', function (req, res) {
	fs.readFile('./views/post.html', 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}
		res.send(data);
	});
})

// takes out organizations from json and puts the same named ones together
// since the languaeg is new, took the sceleton of the code from: 
// http://stackoverflow.com/questions/14053509/parsing-a-json-tree-in-nodejs 
function traverse(obj) {
	if (obj instanceof Array) {
		for (var i=0; i<obj.length; i++) {
			if (typeof obj[i] == "object" && obj[i]) {
			    traverse(obj[i]);
			}
		}
	} else {
		for (var prop in obj) {
			if (typeof obj[prop] == "object" && obj[prop]) {
				traverse(obj[prop]);
			} else {
				if(answ.indexOf(obj[prop]) == -1){
					answ.push(obj[prop]);
				}
			}
		}
	}
}

// the post request
app.post('/add/post', function (req, res) {
	traverse(req.body);
	for (var org in answ) {
		db.collection('organizations').insert({name:answ[org]}, function(err, result){
			if(err) return console.log(err)
		})
	}
})

// for website delete page
app.get('/remove', function(req, res) {
	fs.readFile('./views/remove.html', 'utf-8', function (err, data) {
		if (err) {
			return console.log(err);
		}
		res.send(data);
	});
})

// the delete request
app.delete('/remove/delete', function(req, res) {
	// removes everything from database
	db.collection('organizations').remove({});
})

// local server
var server = app.listen(8080, () => {
	var port = server.address().port
	console.log("Example app listening at http://localhost:%s", port)
})



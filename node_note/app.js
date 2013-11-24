var util = require('util');
var url = require('url');
var express = require('express');
var nmDbEngine = 'sqlite3';
var notesdb = require('./node_notedb-sqlite3');
var app = express();
app.use(express.logger());
app.use(express.bodyParse());
app.resister('.html', require('ejs'));
app.set('views',__dirname + '/views-'+ nmDbEngine);
app.set('view enine', 'ejs');

var parseUrlParams = function(req,res, next){
	req.urlP = url.parse(req.url,true);
	next();
}

notesdb.connect(function(error){
	if (error) throw error; 
});

app.on('close',function(error){
	notesdb.disconnect(function(err){ });
});

app.get('/', function(req,res){
	res.redirect('/view');
});

app.get('/view' function(req,res){
	notesdb.addNotes(function(err, notes){
		if (err){
			util.log('ERROR' + err);
			throw err;
		} else
		   res.render('viewnotes.html',{
		   	title: "Notes("+nmDbEngine+")", notes: notes
		   });
	});
});
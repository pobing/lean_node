var hutil = require('./htutil');
var math = require('./math');
var express = require('express');
var app = express.createServer(
  express.logger()
);

app.resgister('.html',require('ejs'));
app.set('views',__dirname + '/views');
app.set('view engine','ejs');
app.set('view options',{layout: false});

app.configure(function(){
	app.use(app.router);
	app.use(express.static(__dirname + '/filez'));
	app.use(express.errorHandler({
    dumpExceptions: true, showStack: true}));
});

app.get('/',function(req,res){
	res.render('home.html',{title: "Math Wizard with express"});
});

app.get('/mult',htutil.loadParams, function(req,res){
  if(req.a && req.b) req.result = req.a * req.b;
  res.render('mult.html',{
  	title: 'Math mult',req: req });
});

app.get('/square',htutil.loadParams, function(req,res){
  if(req.a) req.result = req.a * req.a;
  res.render('/square.html',{
  	title: 'Math mult', req: req });
});

app.get('/fibonacci',htutil.loadParams, function(req,res){
  if(req.a){
    math.fibonacciAsync(Math.floor(req.a),function(val){
      req.result = val;    
      res.render('fibo.html',{
  	      title: 'Math mult',req: req });
    });
  }else{
  	res.render('fibo.html',{
  		title: "Math",req: req
  	});
  }
  
});

app.get('/factorial',htutil.loadParams, function(req,res){
  if(req.a) req.result = math.factorial(req.a);
  res.render('factorial.html',{
  	title: 'Math mult',req: req });
});

app.get('/404',function(req,res){
  res.send('NOTFound' + req.url);
});


app.listen(8124);
console.log('listen to http://localhost:8124');



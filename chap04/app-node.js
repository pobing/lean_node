var http_port = 8124;
var http = require('http');
var hutil = require('./htutil');
var server = http.createServer(function (req,res){
  hutil.loadParams(req,res,undefined);
  if (req.requrl.pathname === '/'){
    require('./home-node').get(req,res);
  }else if (req.requrl.pathname === '/square'){
    require('./square-node').get(req,res);
  }else if (req.requrl.pathname === '/factorial'){
    require('./factorial-node').get(req,res);
  }else if (req.requrl.pathname === '/fibonacci'){
    require('./fibo-node').get(req,res);
  }else if (req.requrl.pathname === '/mult'){
    require('./mult-node').get(req,res);
  }else{
    res.writeHead(404,{'Content-Type': 'text/plain'});
    res.end("bad URL" + req.url);
  }
});

server.listen(http_port);
console.log('listen to http://localhost:8124');
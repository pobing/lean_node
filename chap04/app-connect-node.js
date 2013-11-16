var connect = require('connect');
var hutil = require('./htutil');
connect.createServer()
.use(connect.favicon())
.use(connect.logger())
.use('/filez',connect.static(__dirname + '/filez'))
.use(connect.router(function(app){
  app.get('/',
    require('./home-node').get);
  app.get('/square',hutil.loadParams,
    require('./square-node').get);
  app.get('/factorial',hutil.loadParams,
    require('./factorial-node').get);
  // app.get('/fibonacci',hutil.loadParams,
  //   require('./fibo-node').get);
  app.get('/mult',hutil.loadParams,
    require('./mult-node').get);
})).listen(8124);
console.log('listen to http://localhost:8124');
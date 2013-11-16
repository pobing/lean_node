var hutil = require('./htutil');
exports.get = function(req,res) {
  res.writeHead(200,{
    'Content-Type': 'text/html'
  });
  res.end(
  hutil.page("Math Wizard",
    hutil.navbar(),
    "<p>Math Wizard</p>")
    );
}
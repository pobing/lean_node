var util = require('util');
var A = "a different value A";
var B = "b different value B";
var m1 = require('./moudle1');
util.log('A='+A+' B ='+B+' values='+util.inspect(m1.values()));
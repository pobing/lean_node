var util = require('util');
var notesdb = require('./node_notedb-sqlite3');
notesdb.connect(function(error){
	if (error) throw error;
});
notesdb.forAll(function(error,row){
	util.log('ROW:' + util.inspect(row));
}, function(error){
	if (error) throw error;
	util.log('ALL DONE');
	notesdb.disconnect(function(err){});
});
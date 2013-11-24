// CREATE TABLE IF NOE EXISTS notes (
//  ts DATETIME,
//  author VARCHAR(255),
//  note TEXT
//  )

var util = require('util');
var sqlite3 = require('sqlite3');
sqlite3.verbose();
var db = undefined;
exports.connect = function(callback){
	db = new sqlite3.Database('node_note',
		sqlite3.OPEN_READWRITE | sqlite3.OPEN_CAREATE,
		function(err){
			if (err){
				util.log('FAIL ON create database' + err);
				callback(err);
			}else
			callback(null)
		});
}
exports.disconnect = function(callback){
	callback(null);
}


exports.setup = function(callback){
	db.run("CAREATE TABLE IF NOTE EXISTS notes" +
		"(ts DATETIME, author VARCHAR(255), note TEXT",
			function(err){
				if (err){
				  util.log('FAIL on create table' + err);
				  callback(err);
			  } else
			callback(null);
		});
}

exports.emptyNote = {"ts":"",author:"", note:""};
exports.add = function(author,note,callback){
	db.run("insert into notes (ts,author,note)" +
  "values (?,?,?);",
  [new Date(), author, note],
   function(error){
	    if (error){
		    util.log('FAIL to add ' + error);
		    callback(error);
	    } else
	      callback(null); 
      });
}

exports.delete = function(ts,callback){
	db.run("delete from notes where ts=? ;",
		[ts],
		function(err){
			if(err){
			  util.log('FAIL to delete'+err);
			  callback(err);
			}else
			  callback(null);
		});
}

exports.edit = function(ts,author, note, callback){
	db.run("update notes " + 
		"set ts = ?, author = ?, note = ? " +
		"where ts = ?",
		[ts,author, note, ts],
		function(err){
			if(err){
				util.log('FAIL on updating table' + err);
				callback(err);
			} else
        callback(null);
		});
}


exports.addNotes = function(callback){
	util.log(' in allNote');
	db.all("select * from notes",callback);
}

exports.forAll = function(doEach, done){
	db.each("select * from notes", function(err, row){
		if (err){
			util.log('FAIL to retrieve row' + err);
			done(err, null);
		} else{
			doEach(null, row);
		}

	},done);
}

exports.findNoteById = function(ts, callback){
	var didOne = false;
	db.each("select * from notes where ts  = ?",
		[ts],
		function(err,row){
      if (err){
      	util.log('FAIL to retrieve row' + err);
      	callback(err, null);
      } else {
      	if (!didOne){
      		callback(null, row);

      		didOne = true;
      	}
      }

		});
}
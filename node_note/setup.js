var util = require('util');
var async = require('async');
var notesdb = require('./node_note-sqlite3');
notesdb.connect(function(error){
	if (error) throw error;
});

notesdb.setup(function(error){
	if (error){
		util.log('ERROR' + error);
		throw error;
	}
	async.series({
		function(cb){
			notesdb.add("Lorem Ipsum",
				"Cras metus. Sed aliquet rsusus a tortor. Integer id quam.",
				function(error){
					if (error) util.log('ERROR' + error);
					cb(error);
				});
		}
	},
    function(error,results){
    	if (error) util.log('ERROR' + error);
    	notesdb.disconnect(function(err){});
    }
	);
});

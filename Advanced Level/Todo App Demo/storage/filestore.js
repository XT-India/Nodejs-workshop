var fs = require('fs');
var file = __dirname + '/store.json';
var userfile = __dirname + '/users.json';

/* get entire data from storage. sets the username space if not already set. */
var getdata = function(namespace,cb) {
	
	fs.readFile(file, 'utf8', function (err, data) {
	  
	  if (err) {
		console.log('Error: ' + err);
		return cb({},false);
	  } else {
		
		try {
			data = JSON.parse(data);
		} catch(e) {
			//Tasks . handle when the file is emptied to erase data
			data = {};
		}
		if(typeof(data[namespace])=="null" || typeof(data[namespace])=="undefined") {
			data[namespace] = [];
		}			
		return cb(data,false);
	  }
	  
	});
	
}

/* puts tasks into a particular namespace. */
var putdata = function(namespace,data,cb) {
	
	getdata(namespace,function(store,err) {
		
		if(store) {
			
			store[namespace] = data;
			fs.writeFile(file, JSON.stringify(store), function(err) {
				if(err) {
					return cb(false);
				} else {
					return cb(true);
				}
			});
			
		}
		
	});
	
}

/* gets user detail from user storage. If not already there, then creates one. */
var getuser = function(userid,password,cb) {
	
	fs.readFile(userfile, 'utf8', function (err, data) {
	  
	  if (err) {
	  
		console.log('Error: ' + err);
		return cb(false,err);
		
	  } else {
	  
		try {
			data = JSON.parse(data);
		} catch(e) {
			//Tasks . handle when the file is emptied to erase data
			data = {};
		}
		if(typeof(data[userid])=="null" || typeof(data[userid])=="undefined") {
		
			data[userid] = {password:password,userid:userid};
			fs.writeFile(userfile, JSON.stringify(data), function(err) {
				if(err) {
					return cb({user:false,status:'storage_error'},false);
				} else {
					return cb({user:data[userid],status:'new_user'},false);
				}
			});			
		
		} else {
			
			if(data[userid].password == password){
				return cb({user:data[userid],status:'existing_user'},false);
			} else {
				return cb({user:false,status:'wrong_password'},false);
			}
			
		}			
		
	  }
	  
	});
	
}

module.exports.putdata = putdata;
module.exports.getdata = getdata;
module.exports.getuser = getuser;
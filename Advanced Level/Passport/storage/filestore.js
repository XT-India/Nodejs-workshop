var fs = require('fs');
var userfile = __dirname + '/users.json';



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

module.exports.getuser = getuser;
var store	= require('../storage/filestore');

module.exports = function(app) {
	
	/** Route used to get the tasks from File Storage **/
	app.get('/api/store/getTasks', ensureAuthenticated, function(req, res){
	  
	  var namespace = req.user.uniquekey;
	  store.getdata(namespace,function(data,err) {
		if(data) {
			res.json({usernamespace:data[namespace]});
		}
	  });
	  
	});
	
	/** Route used to create a task **/
	app.post('/api/store/createTask', ensureAuthenticated, function(req, res){
	  
		var namespace = req.user.uniquekey;						
		store.getdata(namespace,function(data,err) {
			if(data) {			
				//Takes the user namespace from the JSON of file and puts new data into it.
				var todos = data[namespace];
				/** generate a new id for the created element **/
				var item = { id : (todos.length >= 1)?(parseInt(todos[todos.length-1].id,10)+1):1,
							 title : req.body.item,
							 completed : false };
				todos.push(item);
				store.putdata(namespace,todos,function(status) {
					res.json({status:status});
				});
				
			}
		});   
	  
	});
	
	/** Route used to update a task to completion **/
	app.post('/api/store/completeTask', ensureAuthenticated, function(req, res){
	  
		var namespace = req.user.uniquekey;
		var updateId = req.body.id;
		var updateStatus = req.body.status;
		var status = "element not found";
		
		store.getdata(namespace,function(data,err) {
			if(data) {
				/** find position by id and update **/
				var todos = data[namespace];
				for(var i=0; i<todos.length; i++) {
					if (todos[i].id == updateId) { 
						todos[i].completed = updateStatus;
						status = "element found and updated";						
						break;
					}
				}
				store.putdata(namespace,todos,function(msg) {
					res.json({status:status});
				});				
			}
		});   
	  
	});
	
	/** Route used to delete a task **/
	app.post('/api/store/deleteTask', ensureAuthenticated, function(req, res){
	  
		var namespace = req.user.uniquekey;
		var deleteId = req.body.id;
		var status = "element not found";
		
		store.getdata(namespace,function(data,err) {
			if(data) {
				/** find position by id and delete **/
				var todos = data[namespace];
				for(var i=0; i<todos.length; i++) {
					if (todos[i].id == deleteId) {
						todos.splice(i, 1);
						status = "element found and deleted";						
						break;
					}
				}
				store.putdata(namespace,todos,function(msg) {
					res.json({status:status});
				});				
			}
		});   
	  
	});	
	

}

/** middle ware for protected routes **/
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}
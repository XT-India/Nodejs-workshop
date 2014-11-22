module.exports = function(app) {
	
	/* Application root */
	app.get('/', function(req, res){
		res.render('index', { user:req.user });
	});
	
	/* msg used to convey the login error messages */
	app.get('/login/:msg?', function(req, res){
	  res.render('login', { error:req.params.msg });
	});
	
	/* account details says which provider we used */
	app.get('/account', ensureAuthenticated, function(req, res){
	  res.render('account', { user: req.user });
	});
	
	/* todo app */
	app.get('/lists', ensureAuthenticated, function(req, res){
	  res.render('todolist', { user: req.user });
	});
	
	/* application logout */
	app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});

}

/** middle ware for protected routes **/
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}
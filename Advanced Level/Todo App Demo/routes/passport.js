var passport = require('passport')
  , GoogleStrategy = require('passport-google').Strategy
  , FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(app) {
	
	/** Passport code specific to google **/
	app.get('/auth/google', 
	  passport.authenticate('google', { failureRedirect: '/login' }),
	  function(req, res) {
		res.redirect('/');
	  });
	  
	app.get('/auth/google/return', 
	  passport.authenticate('google', { failureRedirect: '/login' }),
	  function(req, res) {
		res.redirect('/');
	  });

	/** Passport code specific to facebook **/
	app.get('/auth/facebook', 
	  passport.authenticate('facebook', { failureRedirect: '/login' }),
	  function(req, res) {
		res.redirect('/');
	  });
	  
	app.get('/auth/facebook/return', 
	  passport.authenticate('facebook', { failureRedirect: '/login' }),
	  function(req, res) {
		res.redirect('/');
	  });
	
    /** Passport code specific to local strategy **/	
	app.post('/auth/local', function(req, res, next) {
		passport.authenticate('local', function(err, user, info) {
          
			/* if no data entered send the error message*/
            if (user === false) {
              err = 'Please enter Username and Password';
              return res.redirect('/login/'+encodeURIComponent(err)); 
            }
          
			/*err values passed as parameters to display on login page*/
			if (err) {
				return res.redirect('/login/'+encodeURIComponent(err)); 
			}
			
			if (!user) { 
				return res.redirect('/login/'+encodeURIComponent(err));  
			}
			
			req.logIn(user, function(err) {
			  if (err) { 
				return res.redirect('/login/'+encodeURIComponent(err)); 
			  }
			  return res.redirect('/');
			});
			
		
		})(req, res, next);
	});

}

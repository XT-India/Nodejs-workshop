/** Require passport and related auth strategies for application **/
var config = require("../config.json");
var passport = require('passport')
  , GoogleStrategy = require('passport-google').Strategy
  , FacebookStrategy = require('passport-facebook').Strategy
  , LocalStrategy = require('passport-local').Strategy;
  
var store = require('../storage/filestore');

module.exports = (function() {

	passport.serializeUser(function (user, done) {
	  done(null, user);
	});
	passport.deserializeUser(function (obj, done) {
	  done(null, obj);
	});

	/** google auth strategy **/
	passport.use(new GoogleStrategy({
		returnURL: config.passport.returnUrl+'auth/google/return',
		realm: config.passport.returnUrl
	  },
	  function(identifier, profile, done) {
		
			profile.identifier = identifier;
			profile.provider = "Google";
			profile.uniquekey = profile.provider+'-'+profile.emails[0].value;
			return done(null, profile);
		
	  }
	));

	/** facebook auth strategy **/
	passport.use(new FacebookStrategy({
		clientID: config.passport.facebook.clientID,
		clientSecret: config.passport.facebook.clientSecret,
		callbackURL: config.passport.returnUrl+"auth/facebook/return"
	  },
	  function(accessToken, refreshToken, profile, done) {
			profile.accessToken = accessToken;
			profile.refreshToken = refreshToken;
			profile.provider = "Facebook";
			profile.uniquekey = profile.provider+'-'+profile.id;
			return done(null, profile);
	  }
	));
	
	/** local strategy **/
	passport.use(new LocalStrategy(
	  function(username, password, done) {
		
		/* creates new user if not already there. else fetches the user data. */
		store.getuser(username,password,function(data,err) {			
			
			if(err) {
				if (err) { return done('Application error.'+err); }
			}
			
			if(data.status == 'existing_user' || data.status == 'new_user') {
				
				profile = data.user;
				profile.provider = "Local";
				profile.status = data.status;
				profile.displayName = data.user.userid;
				profile.uniquekey = profile.provider+'-'+profile.displayName;
				return done(null, profile);
				
			} else if(data.status == 'wrong_password') {
				
				return done('User exists. Incorrect password entered.', false, { message: 'User exists. Incorrect password entered.' });
				
			} else {
				
				return done('Error in storing to json.', false, { message: 'Error in storing to json.' });
				
			}
			

		});
		
	  }
	));
	
	return passport;

})();
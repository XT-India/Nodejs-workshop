var passport = require('./passport');
var application = require('./application');

module.exports = function(app) {
	
	/* apply routes to app */
	passport(app);
	application(app);	

}
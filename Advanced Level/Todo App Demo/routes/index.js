var passport = require('./passport');
var api = require('./api');
var application = require('./application');

module.exports = function(app) {
	
	/* apply routes to app */
	passport(app);
	api(app);
	application(app);	

}
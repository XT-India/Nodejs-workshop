var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Welcome to Nodejs Workshop' });
});

/* GET Hello World page. */
router.get('/task', function(req, res) {
    res.render('task', { title: 'To Do List' })
});

module.exports = router;

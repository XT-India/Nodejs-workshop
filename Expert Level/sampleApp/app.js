var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    routes = require('./routes'),
    tasks = require('./routes/tasks'),
    mongoskin = require('mongoskin'),
    errorHandler = require('errorhandler'),
    db = mongoskin.db('mongodb://localhost:27017/todo?auto_reconnect');


var app = express();

//setup all configurations
//app.configure method is removed from express 4.X
//so don't wrap any set or get inside app.configure
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//create DB object
app.use(function(req, res, next) {
  req.db = {};
  req.db.tasks = db.collection('tasks');
  next();
})

app.param('task_id', function(req, res, next, taskId) {
  req.db.tasks.findById(taskId, function(error, task){
    if (error) return next(error);
    if (!task) return next(new Error('Task is not found.'));
    req.task = task;
    return next();
  });
});

//configure routes
app.get('/', routes.index);
app.get('/task', tasks.list);
app.post('/task', tasks.add);
app.get('/task/:task_id', tasks.del);

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

module.exports = app;

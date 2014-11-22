
/*
 * GET task listing.
 */
var tasks = {};
tasks.list = function(req, res, next){
  req.db.tasks.find().toArray(function(error, tasks){
    console.log(tasks);
    if (error) return next(error);
    res.render('task', {
      title: 'Todo List',
      tasks: tasks || []
    });
  });
};

tasks.add = function(req, res, next){
  if (!req.body || !req.body.name) return next(new Error('No data provided.'));
  req.db.tasks.save({
    name: req.body.name
    }, function(error, task){
    if (error) return next(error);
    if (!task) return next(new Error('Failed to save.'));
    console.info('Added %s with id=%s', task.name, task._id);
    res.redirect('/task');
  })
};


tasks.del = function(req, res, next) {
    console.log(req.task._id , req.params.task_id.toString())
  req.db.tasks.removeById(req.task._id, function(error, count) {
    if (error) return next(error);
    if (count !==1) return next(new Error('Something went wrong.'));
    console.info('Deleted task %s with id=%s completed.', req.task.name, req.task._id);
    res.status(200).send();
  });
};

module.exports = tasks;

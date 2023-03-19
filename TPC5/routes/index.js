var express = require('express');
var router = express.Router();
var Task = require('../controllers/task')


/* GET home page. */
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0,16)
  Task.list()
    .then( tasks => {
      res.render('tasksListPage', { taskList: tasks, d:data, task:"" });
    })
    .catch( erro => {
      res.render('error', {error: erro, message: "Erro na obetenção na lista das tarefas"})
    })
});

/* Register task. */
router.get('/tasks/registo', function(req, res, next) {
  var data = new Date().toISOString().substring(0,16)
  Task.list()
    .then( tasks => {
      res.render('tasksListPage', { taskList: tasks, d:data, task:"" });
    })
    .catch( erro => {
      res.render('error', {error: erro, message: "Erro na obetenção na lista das tarefas"})
    })
});


/* GET Task page. */
router.get('/tasks/:id', function(req, res, next) {
  var data = new Date().toISOString().substring(0,16)
  Task.list()
    .then( tasks => {
      Task.getTask(req.params.id)
        .then( task => {
          console.log(task)
          res.render('tasksListPage', { taskList: tasks, d:data, task:task });
        })
        .catch( erro => {
          res.render('error', {error: erro, message: "Erro na obetenção do registo da tarefa"})
        })
    })
    .catch( erro => {
      res.render('error', {error: erro, message: "Erro na obetenção na lista das tarefas"})
    })
});

/* GET edit Task page. */
router.get('/tasks/edit/:id', function(req, res, next) {
  var data = new Date().toISOString().substring(0,16)
  Task.list()
    .then( tasks => {
      Task.getTask(req.params.id)
        .then( task => {
          console.log(task)
          res.render('tasksListPage', { taskList: tasks, d:data, task:task });
        })
        .catch( erro => {
          res.render('error', {error: erro, message: "Erro na obetenção do registo da tarefa"})
        })
    })
    .catch( erro => {
      res.render('error', {error: erro, message: "Erro na obetenção na lista das tarefas"})
    })
});


/* GET Task Form Data. */
router.post('/tasks/registo', function(req, res, next) {
  var data = new Date().toISOString().substring(0,16)
  Task.list()
    .then( tasks => {
      var result = req.body
      result.done = "0"
      result.id = tasks.lenght
      Task.addTask(result)
        .then( task => {
          res.render('addTaskConfirm', { a: task, d:data });
        })
        .catch( erro => {
          res.render('error', {error: erro, message: "Erro no armazenamento do registo da tarefa"})
        })
    })
  .catch( erro => {
    res.render('error', {error: erro, message: "Erro na obetenção na lista das tarefas"})
  })
});

/* GET Task Edit Form Data. */
router.post('/tasks/edit/:id', function(req, res, next) {
  var data = new Date().toISOString().substring(0,16)
  Task.getTask(req.params.id)
    .then(task => {
      var result = req.body
      if(result.who === undefined)
        result.who = task.who
      if(result.deadline === undefined)
        result.deadline = task.deadline
      if(result.description === undefined)
        result.description = task.description
      if(result.done === undefined)
        result.done = "0"
      result.id = req.params.id
      Task.updateTask(result)
        .then( task => {
          res.render('updateTaskConfirm', { a: task, d:data });
        })
        .catch( erro => {
          res.render('error', {error: erro, message: "Erro no armazenamento do registo da tarefa"})
        })
    })
    .catch( erro => {
      res.render('error', {error: erro, message: "Erro na obetenção na lista das tarefas"})
    })
});

router.get('/tasks/done/:id', function(req, res, next) {
  var data = new Date().toISOString().substring(0,16)
  Task.getTask(req.params.id)
    .then(taskDone => {
      taskDone.done="1"
      Task.updateTask(taskDone)
        .then( task => {
          res.render('updateTaskConfirm', { a: task, d:data });
        })
        .catch( erro => {
          res.render('error', {error: erro, message: "Erro no armazenamento do registo da tarefa"})
        })
    })
    .catch( erro => {
      res.render('error', {error: erro, message: "Erro na obetenção na lista das tarefas"})
    })
  

});


/* GET Task Delete page. */
router.get('/tasks/delete/:id', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.list()
    .then( tasks => {
      Task.getTask(req.params.id)
        .then(task => {
          res.render('deleteTaskForm', { taskList: tasks, d:data, task:task });
        })
        .catch(erro => {
          res.render('error', {error: erro, message: "Erro na obtenção do registo da tarefa"})
        })
        })
  .catch( erro => {
    res.render('error', {error: erro, message: "Erro na obetenção na lista das tarefas"})
  })
});

/* GET Task Delete Confirm page. */
router.get('/tasks/deleteConfirm/:id', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.deleteTask(req.params.id)
    .then(tasks => {
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo da tarefa"})
    })
});


module.exports = router;

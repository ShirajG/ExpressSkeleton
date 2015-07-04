var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res) {
  models.Task.findAll({
  }).then(function(tasks){
    res.render('tasks/index.jade',{
      users: users
    });
  });
});

/* Serve signup form */
router.get('/new', function(req, res) {
  if(req.cookies.userId){
    res.render("tasks/new.jade");
  } else {
    res.redirect("/");
  }
});

/* Create task in DB */
// Need to update this so it associates 
// the task with the user id in session
router.post('/', function(req, res) {
  models.Task.create({
    title: req.body.title,
    description: req.body.description,
    UserId: req.cookies.userId
  }).then(function(task){
    models.User.findById(req.cookies.userId).then(function(user){
      user.addTask(task);
    });
  }).then(function(){
    res.redirect('/');    
  });
});

// Delete a task
router.delete('/:id', function(req, res) {
  models.Task.find({
    where: {id: req.param('id')},
    include: [models.Task]
  }).then(function(user){
    models.Task.destroy(
      {where: {id: user.id}}
    ).then(function(affectedRows){
      user.destroy().then(function(){
        res.redirect('/');
      });
    });
  });
});

// Edit a task
router.post('/:id/edit', function(req, res) {
  res.send("User updated");
});

/* Show individual task */
router.get('/:id', function(req, res) {
  // Query the database to find the user.
  res.send(req.params.id);
});

module.exports = router;
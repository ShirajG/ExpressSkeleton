var express = require('express');
var router = express.Router();
var models = require('../models');
var bcrypt = require('bcrypt-nodejs');

/* GET users listing. */
router.get('/users', function(req, res) {
  models.User.findAll({
  }).then(function(users){
    res.render('users/index.jade',{
      users: users
    });
  });
});

/* Serve signup form */
router.get('/user/new', function(req, res) {
  res.render("users/new.jade");
});

/* Create user in DB */
router.post('/users', function(req, res) {
  bcrypt.hash(req.body.password,null,null,function(err, hash){
    models.User.create({
      email: req.body.email,
      password: hash,
      profile: JSON.stringify(
        {
          nick: req.body.nick
        }
      )
    }).then(function(user){
      req.session.user = user;
      res.redirect('/');
    });
  });
});

// Delete a user
router.delete('user/:id', function(req, res) {
  models.User.find({
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

// Edit a user
router.post('user/:id/edit', function(req, res) {
  res.send("User updated");
});

/* Show individual user */
router.get('user/:id', function(req, res) {
  // Query the database to find the user.
  res.send(req.params.id);
});

module.exports = router;
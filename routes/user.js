var express = require('express');
var router = express.Router();
var models = require('../models');
var bcrypt = require('bcrypt-nodejs');

/* 
  Any routes which contain :id will have 
  the appropriate record pulled into req.user
*/
router.param('id', function(req,res,next,name){
  models.User.findById( parseInt(req.params.id) ).then(function(user){
    if( user ){
      req.user = user;
      next();
    } else {
      req.flash('error',"Invalid user Id");
      res.redirect('/');
    }
  });
});

/* GET users listing. */
router.get('/users', function(req, res) {
  models.User.findAll({
  }).then(function(users){
    res.render('users/index.jade',{
      users: users
    });
  });
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

/* Edit a record */ 
router.post('user/:id/edit', function(req, res) {
  res.redirect('/');
});

/* Serve signup form */
router.get('/user/new', function(req, res) {
  res.render("users/new.jade");
});

// Delete a user
router.delete('/user/:id', function(req, res) {
  if (req.session.user.id === parseInt(req.params.id)){
    models.User.findById( req.params.id ).then(function(user){
      if( user ){
        user.destroy();
        res.sendStatus(200);
      } else {
        req.flash('error',"Invalid user Id");
        res.sendStatus(200);
      }
    });
  } else {
    req.flash('error','Not authorized');
    res.sendStatus(200);
  }
});

/* Show individual user */
router.get('/user/:id', function(req, res) {
  res.render('users/user.jade',{user: req.user});
});

module.exports = router;
var express = require('express');
var router = express.Router();
var models = require('../models');
var bcrypt = require('bcrypt-nodejs');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', req.session);
});

// Login route
router.get('/login', function(req,res){
  res.render('users/login.jade');
});
// Sets logged in User in session 
router.post('/login', function(req,res){
  models.User.find({
    where: {email: req.body.email}
  }).then(function(user){
    if( user ){
      bcrypt.compare(req.body.password, user.password, function(err,resp){
        if( resp ){
          req.session.user = user;
        } else {
          req.session.error = 'Incorrect Email or Password';
        }
        res.redirect('/');
      });  
    } else {
      req.session.error = 'Incorrect Email or Password';
      res.redirect('/');  
    }
  });
});

// logout route
router.get('/logout', function(req,res){
  req.session.user = null;
  res.redirect('/');
});

module.exports = router;

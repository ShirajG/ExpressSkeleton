var express = require('express');
var router = express.Router();
var models = require('../models');
var bcrypt = require('bcrypt-nodejs');
var passport = require('../middleware/passportConfig');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {session: req.session, flash: req.flash('error')});
});

// Login route
router.get('/login', function(req,res){
  res.render('users/login.jade');
});
// Sets logged in User in session 
router.post('/login', passport.authenticate('local',{
  failureRedirect: '/',
  failureFlash: true
}), 
  function(req,res){
    req.session.user = req.user;
    res.redirect('/');
});

// logout route
router.get('/logout', function(req,res){
  req.session.user = null;
  res.redirect('/');
});

module.exports = router;

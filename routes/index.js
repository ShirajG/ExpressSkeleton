var express = require('express');
var router = express.Router();
var models = require('../models');
var bcrypt = require('bcrypt-nodejs');
var passport = require('../middleware/passportConfig');

/* GET home page. */
router.get('/', function(req, res) {
  var locals = {
    session: req.session, 
    flash: req.flash('error')
  };

  if(req.session.passport.user){
    models.User.find({
      where: {
        'profile.id': req.session.passport.user
      }
    }).then(function(user){
      locals.user = user;
    }).then(function(){
      res.render('index',locals);
    });
  } else {
    res.render('index', locals);
  }

});

// logout route
router.get('/logout', function(req,res){
  req.logOut();
  res.redirect('/');
});

router.get('/auth/google', 
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }),
  function(req,res){
});

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req,res){
    res.redirect('/');
});

module.exports = router;

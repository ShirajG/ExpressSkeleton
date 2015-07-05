var passport = require('passport');
var LocalStrategy = require ('passport-local');
var models = require('../models');
var bcrypt = require('bcrypt-nodejs');

passport.use(new LocalStrategy({
  usernameField: 'email'
},
  function(email, password, done){
    models.User.find({
       where: {email: email}
     }).then(function(user){
       if( user ){
         bcrypt.compare(password, user.password, function(err,resp){
           if( resp ){
             return done(null, user);
           } else {
             return done(null, false, {message: "Incorrect password."});
           }
         });
       } else {
          return done(null, false, {message: "Incorrect  email."});
       }
    }).catch(function(err){
      console.log(err);
    });
  }
));

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  models.User.findById(id).then(function(user){
    done(null, user);
  }).catch(function(err){
    console.log(err);
    done(err);
  });
});

module.exports = passport;
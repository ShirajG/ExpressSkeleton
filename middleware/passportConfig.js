var passport = require('passport');
var LocalStrategy = require ('passport-local');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var models = require('../models');
var bcrypt = require('bcrypt-nodejs');
var credentials = require('../config/credentials');

passport.use(new GoogleStrategy({
    clientID: credentials.google.clientId,
    clientSecret: credentials.google.clientSecret,
    callbackURL: 'http://localhost:' +  process.env.PORT + '/auth/google/callback'
  }, 
  function(accessToken, refreshToken, profile, done){
    process.nextTick(function(){
      models.User.findOrCreate({
        where: { 'profile.id' : profile.id },
        defaults: {
          profile: profile._json,
          'profile.accessToken': accessToken,
          'profile.refreshToken': refreshToken
        }
      }).then( function(user){
        done(null, user[0]);
      });
    });
  }
));

passport.serializeUser(function(user, done){
  done(null, user.profile.id);
});

passport.deserializeUser(function(id, done){
  models.User.find({
    where: { 'profile.id' : id }
  }).then(function(user){
    done(null, user.dataValues);
  }).catch(function(err){
    console.log(err);
    done(err);
  });
});

module.exports = passport;
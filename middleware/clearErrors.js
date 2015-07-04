module.exports = function(req, res, next){
  if(req.session.error && req.session.notSeen){
    req.session.error = null;
    req.session.notSeen = null;
  } else if (req.session.error) {
    req.session.notSeen = true;
  }
  next();
};
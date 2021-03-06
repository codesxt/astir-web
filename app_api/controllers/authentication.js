var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {
  if(!req.body.name || !req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(function(err){
    var token;
    if (err){
      sendJSONresponse(res, 404, err);
    }else{
      token = user.generateJwt();
      sendJSONresponse(res, 200, {
        "token": token
      });
    }
  });
};

module.exports.login = function(req, res){
  if(!req.body.email || !req.body.password){
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  passport.authenticate('local', function(err, user, info){
    var token;

    if(err){
      sendJSONresponse(res, 404, err);
      return;
    }

    if(user){
      token = user.generateJwt();
      sendJSONresponse(res, 200, {
        "token": token
      });
    }else{
      sendJSONresponse(res, 401, info);
    }
  })(req, res);
};

exports.roleAuthorization = function(roles){
  return function(req, res, next){
    var user = req.user;
    User.findById(user._id, function(err, foundUser){
      if(err){
        res.status(422).json({error: 'No user found.'});
        return next(err);
      }

      if(roles.indexOf(foundUser.role) > -1){
        return next();
      }

      res.status(401).json({
        message: 'No tienes autorización para ver este contenido.'
      });
      return next('Unauthorized');
    });
  };
}

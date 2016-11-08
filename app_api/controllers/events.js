var mongoose = require('mongoose');
var Event = mongoose.model('Event');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.eventsList = function (req, res) {
  Event.find({},
    function(err, events){
      if(err){
        console.log(err);
        sendJSONresponse(res, 400, err);
      }else{
        //console.log(events);
        sendJSONresponse(res, 201, events);
      }
    });
};
module.exports.eventsCreate = function (req, res) {
  console.log(req.body);
  Event.create(req.body,
    function(err, event){
      if(err){
        console.log(err);
        sendJSONresponse(res, 400, err);
      }else{
        console.log(event);
        sendJSONresponse(res, 201, event);
      }
    });
};
module.exports.eventsReadOne = function (req, res) { };
module.exports.eventsUpdateOne = function (req, res) { };
module.exports.eventsDeleteOne = function (req, res) { };

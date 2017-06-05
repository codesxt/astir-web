var mongoose = require('mongoose');
var Event = mongoose.model('Event');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.eventsList = function (req, res) {
  var hostname = req.headers.host;
  Event.find(
    {
      "when.start": {
        $gt: new Date()
      }
    },
    null,
    {
      sort:{
        "when.start":1
      }
    },
    function(err, events){
      if(err){
        console.log(err);
        sendJSONresponse(res, 400, err);
      }else{
        //console.log(events);
        sendJSONresponse(res, 201, {
          links: {
            self: hostname+'/api/v1/events'
          },
          data: events
        });
      }
    });
};
module.exports.eventsCreate = function (req, res) {
  console.log(req.body);
  var eventData = req.body.data.attributes;
  var newEvent = new Event();
  newEvent.title = eventData.title;
  newEvent.category = eventData.category;
  newEvent.description = eventData.description;
  newEvent.when.start = eventData.when.start;
  newEvent.when.finish = eventData.when.finish;
  newEvent.where.name = eventData.where.name;
  newEvent.where.address = eventData.where.address;
  if(eventData.where.location){
    newEvent.where.location = eventData.where.location;
  }
  newEvent.cost = eventData.cost;
  newEvent.save(function(err){
    if(err){
      console.log(err);
      sendJSONresponse(res, 400, err);
    }else{
      console.log(newEvent);
      sendJSONresponse(res, 201, newEvent);
    }
  });
  /*
  Event.create(req.body,
    function(err, event){
      if(err){
        console.log(err);
        sendJSONresponse(res, 400, err);
      }else{
        console.log(event);
        sendJSONresponse(res, 201, event);
      }
    });*/
};
module.exports.eventsReadOne = function (req, res) { };
module.exports.eventsUpdateOne = function (req, res) { };
module.exports.eventsDeleteOne = function (req, res) {
  var eventId = req.params.eventId;
  console.log("ID: "+eventId);
  if(eventId){
    Event.findByIdAndRemove(eventId)
    .exec(
      function(err, event){
        if(err){
          sendJSONresponse(res, 404, err);
          return;
        }
        sendJSONresponse(res, 204, null);
      }
    )
  }else{
    sendJSONresponse(res, 404, {
      "message": "No se encontró el evento."
    })
  }
};

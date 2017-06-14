var mongoose = require('mongoose');
var Event = mongoose.model('Event');

var JsonApiQueryParserClass = require('jsonapi-query-parser');
var JsonApiQueryParser = new JsonApiQueryParserClass();

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.eventsList = function (req, res) {
  var hostname = req.headers.host;
  var requestData = JsonApiQueryParser.parseRequest(req.url);
  var pageNumber  = requestData.queryData.page.number  || 0;
  var pageSize    = requestData.queryData.page.size    || 0;
  var query = {
    "when.start": {
      $gt: new Date()
    }
  };
  Event.find(
    query
    ,
    null,
    {
      sort:{
        "when.start":1
      },
      skip:pageNumber*pageSize,
      limit:pageSize*1
    },
    function(err, events){
      if(err){
        console.log(err);
        sendJSONresponse(res, 400, err);
      }else{
        //console.log(events);
        Event.count(query, (err, count) => {
          sendJSONresponse(res, 201, {
            meta: {
              "total-pages": count/pageSize,
              "total-items": count
            },
            links: {
              self: hostname+'/api/v1/events'
            },
            data: events
          });
        });
      }
    });
};
module.exports.eventsCreate = function (req, res) {
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
  if(eventData.banner){
    newEvent.banner = eventData.banner;
  }
  newEvent.cost = eventData.cost;
  newEvent.save(function(err){
    if(err){
      console.log(err);
      sendJSONresponse(res, 400, err);
    }else{
      console.log(newEvent);
      sendJSONresponse(res, 201, {
        type:"events",
        id: newEvent._id,
        attributes: {
          description: newEvent.description,
          category: newEvent.category,
          cost: newEvent.cost,
          banner: newEvent.banner,
          where: newEvent.where,
          when: newEvent.when
        },
        links: {
          self: req.headers.host+'/api/v1/events/'+newEvent._id
        }
      });
    }
  });
};
module.exports.eventsReadOne = function (req, res) {
  var eventId = req.params.eventId;
  if(eventId){
    Event.findById(eventId)
    .exec((err, event) => {
      if(err){
        sendJSONresponse(res, 404, err);
        return;
      }
      sendJSONresponse(res, 200, {
        _id: event._id,
        type: "events",
        attributes: {
          description: event.description,
          category: event.category,
          cost: event.cost,
          banner: event.banner,
          where: event.where,
          when: event.when
        },
        relationships: {

        },
        links: {
          self: req.headers.host+'/api/v1/events/'+eventId
        }
      });
    })
  }else{
    sendJSONresponse(res, 400, {
      "message": "Es necesario especificar el ID del evento en la consulta."
    })
  }
};
module.exports.eventsUpdateOne = function (req, res) { };
module.exports.eventsDeleteOne = function (req, res) {
  var eventId = req.params.eventId;
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
    sendJSONresponse(res, 400, {
      "message": "Es necesario especificar el ID del evento en la consulta."
    })
  }
};

var mongoose = require('mongoose');
var Event = mongoose.model('Event');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

var createDummyEvent = function(id){
  var event = {
    id: id,
    title: "Título del Evento " + id,
    category: "Cat",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    when: {
      start: new Date(),
      finish: new Date()
    },
    where: {
      address: "Dirección del evento",
      location: {
        type: 'Point',
        coordinates: [1,1]
      },
      country: "Chile",
      region: "VII",
      city: "Talca"
    },
    cost: [{
      text: "Valor de entrada",
      value: 1000
    }]
  }
  return event;
}

module.exports.eventsList = function (req, res) {
  var events = [];
  for(var i = 0; i < 10; i++){
    events.push(createDummyEvent(i));
  }
  sendJSONresponse(res, 201, events);
};

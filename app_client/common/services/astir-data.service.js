angular
.module('AstirWebApp')
.service('astirDataSvc', astirData);

function astirData($http, authSvc){
  var getEvents = function(){
    return $http.get('/api/v1/events');
  };
  var createEvent = function(newEvent){
    return $http.post('/api/v1/events', {
      data: {
        type: "events",
        attributes: newEvent
      }
    }, {
      headers: {
        Authorization: 'Bearer '+ authSvc.getToken()
      }
    });
  }
  var deleteEvent = function(eventId){
    return $http.delete('/api/v1/events/'+eventId, {
      headers: {
        'Authorization': 'Bearer '+ authSvc.getToken()
      }
    });
  }
  return {
    getEvents : getEvents,
    createEvent : createEvent,
    deleteEvent : deleteEvent
  };
}

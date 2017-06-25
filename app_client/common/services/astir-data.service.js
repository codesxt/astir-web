angular
.module('AstirWebApp')
.service('astirDataSvc', astirData);

function astirData($http, authSvc){
  var getEvents = function(
    pageNumber = 0,
    pageSize = 1
  ){
    var query = '/api/v1/events';
    var queryParams = "";
    if(pageNumber != null && pageSize != null){
      queryParams = queryParams + "page[number]=" + pageNumber;
      queryParams = queryParams + "&page[size]=" + pageSize;
    }
    var queryUrl = query + "?" + queryParams;
    return $http.get(queryUrl);
  };

  var getEvent = function(eventId){
    return $http.get('/api/v1/events/'+eventId);
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

  var getOrganizationByUser =  function(userId){
    return $http.get('/api/v1/organizations?filter[representant]='+userId);
  }

  var createOrganization = function(organizationData){
    return $http.post('/api/v1/organizations', organizationData, {
      headers: {
        'Authorization': 'Bearer '+ authSvc.getToken()
      }
    });
  }

  var getOrganization = (organizationId) => {
    return $http.get('/api/v1/organizations/'+organizationId);
  }

  return {
    getEvents : getEvents,
    getEvent : getEvent,
    createEvent : createEvent,
    deleteEvent : deleteEvent,
    getOrganizationByUser : getOrganizationByUser,
    createOrganization : createOrganization,
    getOrganization : getOrganization
  };
}

angular
.module('AstirWebApp')
.service('astirData', astirData);

function astirData($http){
  var getEvents = function(){
    return $http.get('/api/v1/events');
  };
  return {
    getEvents : getEvents
  };
}

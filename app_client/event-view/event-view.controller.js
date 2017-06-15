angular.module('AstirWebApp')
.controller('eventViewCtrl', eventViewCtrl);

function eventViewCtrl(
  $routeParams,
  astirDataSvc
){
  var vm = this;
  var formError = "KE WEA";
  var eventId = $routeParams.eventId;
  astirDataSvc.getEvent(eventId)
  .success(function(data){
    vm.event = data.attributes;
  })
  .error(function(e){
    vm.formError = e.message;
  })
}

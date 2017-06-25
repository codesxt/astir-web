angular.module('AstirWebApp')
.controller('eventViewCtrl', eventViewCtrl);

function eventViewCtrl(
  $routeParams,
  astirDataSvc
){
  var vm = this;
  var formError = "";
  var eventId = $routeParams.eventId;
  astirDataSvc.getEvent(eventId)
  .success(function(data){
    vm.event = data.attributes;
    astirDataSvc.getOrganization(vm.event.organizer)
    .success(function(data){
      vm.organization = data.attributes;
    })
    .error(function(e){
      //vm.formError = e.message;
    })
  })
  .error(function(e){
    vm.formError = e.message;
  })
}

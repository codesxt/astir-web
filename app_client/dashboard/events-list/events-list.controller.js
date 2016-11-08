angular.module('AstirWebApp')
.controller('eventsListCtrl', eventsListCtrl);

function eventsListCtrl(moment, astirDataSvc, $location){
  var vm = this;
  vm.events = [];
  vm.formError
  vm.getData = function(){
    astirDataSvc.getEvents()
      .success(function(events){
        vm.events = events;
        console.log("Eventos recibidos de la API.");
      })
      .error(function(e){
        vm.formError= "Lo sentimos. Algún problema ocurrió en la obtención de eventos. Por favor, intente más tarde.";
      })
  }
  vm.getData();
}

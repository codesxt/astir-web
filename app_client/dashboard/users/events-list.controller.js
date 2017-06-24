angular.module('AstirWebApp')
.controller('usersCtrl', eventsListCtrl);

function usersCtrl(moment, astirDataSvc, authSvc, $location){
  var vm = this;
  vm.events = [];
  vm.formError = "";
  vm.pageNumber = 1;
  vm.pageSize = 5;
  vm.pageTotalItems = 0;
  vm.pageChanged = () => {
    vm.getData();
  };
  vm.getData = function(){
    astirDataSvc.getEvents(vm.pageNumber-1, vm.pageSize)
      .success(function(res){
        vm.events = res.data;
        vm.pageTotalItems = res.meta["total-items"];
        console.log("Eventos recibidos de la API.");
      })
      .error(function(e){
        vm.formError= "Lo sentimos. Algún problema ocurrió en la obtención de eventos. Por favor, intente más tarde.";
      })
  }
  vm.getData();
  vm.deleteEvent = function(event){
    var eventId = event._id;
    var confDialog = "¿Desea borrar el evento \""+ event.title +"\"?";
    var conf = confirm(confDialog);
    if(conf){
      console.log("Borrar el evento: " + eventId);
      astirDataSvc.deleteEvent(eventId)
      .success(function (data) {
        var index = vm.events.indexOf(event);
        vm.events.splice(index, 1);
      })
      .error(function (e) {
        vm.formError = "Hubo un error al eliminar el evento. Por favor, recargue la página e intente de nuevo.";
        console.log("Error recibido: "+e.message);
      });;
    }
  };

  vm.viewEvent = function(event){
    $location.path("/event-view/"+event._id);
  }
}

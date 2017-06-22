angular.module('AstirWebApp')
.controller('usersCtrl', usersCtrl);

function usersCtrl(moment, authSvc, $location, usersSvc){
  var vm = this;
  vm.users = [];
  vm.formError = "";
  vm.pageNumber = 1;
  vm.pageSize = 5;
  vm.pageTotalItems = 0;
  vm.pageChanged = () => {
    vm.getData();
  };
  vm.getData = function(){
    usersSvc.getUsers(vm.pageNumber-1, vm.pageSize)
      .success(function(res){
        vm.users = res.data;
        vm.pageTotalItems = res.meta["total-items"];
      })
      .error(function(e){
        vm.formError = "Se ha producido un error en la obtención de datos. Error: " + e.message;
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
      });
      vm.getData();
    }
  };

  vm.viewEvent = function(event){
    $location.path("/event-view/"+event._id);
  }
}

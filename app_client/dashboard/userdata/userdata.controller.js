angular.module('AstirWebApp')
.controller('userdataCtrl', userdataCtrl);

function userdataCtrl(usersSvc, authSvc){
  var vm = this;
  vm.user = { };
  vm.formError = "";
  vm.editing = false;
  vm.getData = () => {
    usersSvc.getSelfUserData()
    .success(function(data){
      vm.user = data;
    })
    .error(function(e){
      vm.formError = "Se produjo un error en la obtención de datos de usuario. Error: " + e;
    })
  }
  vm.getData();

  vm.editUser = () => {
    vm.editing = true;
    vm.newUserData = {
      name: vm.user.attributes.name,
      email: vm.user.attributes.email
    }
  }

  vm.cancelEdit = () => {
    vm.editing = false;
    vm.newUserData = null;
  }

  vm.updateUserData = () => {
    usersSvc.updateSelfUserData(vm.newUserData)
    .success((result) => {
      authSvc.saveToken(result.token);
      vm.getData();
      vm.cancelEdit();
    })
    .error((e) => {
      vm.formError = "Se produjo un error. Error: " + e.message;
    })
  };

  vm.removeUser = () => {
    alert("La opción no está habilitada aún.");
  }
}

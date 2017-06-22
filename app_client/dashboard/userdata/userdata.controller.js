angular.module('AstirWebApp')
.controller('userdataCtrl', userdataCtrl);

function userdataCtrl(usersSvc){
  var vm = this;
  vm.user = {};
  vm.formError = "";
  usersSvc.getSelfUserData()
  .success(function(data){
    vm.user = data;
  })
  .error(function(e){
    vm.formError = "Se produjo un error en la obtención de datos de usuario. Error: " + e;
  })
}

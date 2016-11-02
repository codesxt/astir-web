angular.module('AstirWebApp')
.controller('loginCtrl', loginCtrl);

function loginCtrl (){
  var vm = this;
  vm.credentials = {
    email: "",
    password: ""
  }
  vm.onSubmit = function(){
    console.log("Datos: " + vm.credentials.email + ", " + vm.credentials.password);
  };
}

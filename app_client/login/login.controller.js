angular.module('AstirWebApp')
.controller('loginCtrl', loginCtrl);

function loginCtrl ($location, authSvc, $rootScope){
  var vm = this;
  vm.credentials = {
    email: "",
    password: ""
  }
  vm.onSubmit = function(){
    vm.formError = "";
    if (!vm.credentials.email || !vm.credentials.password) {
      vm.formError = "Todos los campos son requeridos. Por favor, intente nuevamente.";
      return false;
    } else {
      vm.doLogin();
    }
  };

  vm.doLogin = function(){
    vm.formError = "";
    authSvc
    .login(vm.credentials)
    .error(function(err){
      vm.formError = err.message;
    })
    .then(function(){
      $location.path('/');
      $rootScope.$emit("UserLoggedIn", {});
    });
  }
}

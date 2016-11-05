angular.module('AstirWebApp')
.controller('dashboardNavigationCtrl', dashboardNavigationCtrl);

function dashboardNavigationCtrl($location){
  var vm = this;
  vm.isActive = function (viewLocation) {
    console.log(viewLocation + ", " + $location.path());
    return viewLocation === $location.path();
  };
  vm.isActive('Algo');
}

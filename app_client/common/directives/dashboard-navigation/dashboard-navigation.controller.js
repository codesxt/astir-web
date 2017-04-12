angular.module('AstirWebApp')
.controller('dashboardNavigationCtrl', dashboardNavigationCtrl);

function dashboardNavigationCtrl($location){
  var vm = this;
  vm.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };
}

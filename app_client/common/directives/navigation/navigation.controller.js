angular.module('AstirWebApp')
.controller('navigationCtrl', navigationCtrl);

function navigationCtrl($location, authSvc, $rootScope){
  var vm = this;
  vm.currentPath = $location.path();
  vm.isLoggedIn = authSvc.isLoggedIn();
  vm.currentUser = authSvc.currentUser();
  vm.pageHeader = {
    title: 'Astir',
    subtitle: 'Cultura somos todos'
  };
  vm.logout = function() {
    authSvc.logout();
    vm.isLoggedIn = authSvc.isLoggedIn();
    $location.path('/');
  };
  $rootScope.$on("UserLoggedIn", function(){
    vm.isLoggedIn = authSvc.isLoggedIn();
  });
}

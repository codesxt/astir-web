angular.module('AstirWebApp')
.controller('navigationCtrl', navigationCtrl);

function navigationCtrl(){
  var vm = this;
  vm.pageHeader = {
    title: 'Astir',
    subtitle: 'Cultura somos todos'
  };
}

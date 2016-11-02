angular.module('AstirWebApp')
.directive('navigation', navigation);

function navigation(){
  return {
    restrict: 'EA',
    templateUrl: 'common/directives/navigation/navigation.view.html',
    controller: 'navigationCtrl as navvm'
  };
}

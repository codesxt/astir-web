angular.module('AstirWebApp')
.controller('calendarModalCtrl', calendarModalCtrl);

function calendarModalCtrl ($uibModalInstance, dateData){
  vm = this;
  vm.dateData = dateData;
  vm.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}

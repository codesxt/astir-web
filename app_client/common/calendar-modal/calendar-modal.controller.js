angular.module('AstirWebApp')
.controller('calendarModalCtrl', calendarModalCtrl);

function calendarModalCtrl ($uibModalInstance, dateData, moment){
  vm = this;
  vm.date = dateData.date;
  vm.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
  vm.addDay = function(){
    vm.date = moment(vm.date).add(1, 'days');
  }
  vm.close = function(result){
    $uibModalInstance.close(vm.date);
  };
}

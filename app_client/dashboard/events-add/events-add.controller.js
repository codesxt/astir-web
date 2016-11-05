angular.module('AstirWebApp')
.controller('eventsAddCtrl', eventsAddCtrl);

function eventsAddCtrl(moment, $uibModal){
  var vm = this;
  vm.categories = [
    {value: "music", name: "Música"},
    {value: "theatre", name: "Teatro"},
    {value: "exposition", name: "Exposición"},
    {value: "festival", name: "Festival"},
    {value: "fair", name: "Feria"},
    {value: "talk", name: "Charla"},
    {value: "movie", name: "Aire Libre"}
  ];
  vm.pageHeader = {
    title: 'Astir',
    subtitle: 'Cultura somos todos'
  };
  vm.newEvent = {
    name: "",
    category: vm.categories[0].value,
    description: "",
    when: {
      start: moment(),
      finish: moment().add(2, 'hours')
    },
    where: ""
  };
  vm.onSubmit = function (){
    console.log(vm.newEvent);
  }
  vm.openCalendar = function(){
    var modalInstance = $uibModal.open({
      templateUrl: '/common/calendar-modal/calendar-modal.view.html',
      controller: 'calendarModalCtrl as vm',
      resolve: {
        dateData: function(){
          return {
            date: vm.newEvent.when.start
          }
        }
      }
    });
    modalInstance.result.then(function (data) {
      vm.newEvent.when.start = data;
    });
  };
}

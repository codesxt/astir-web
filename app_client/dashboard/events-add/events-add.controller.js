angular.module('AstirWebApp')
.controller('eventsAddCtrl', eventsAddCtrl);

function eventsAddCtrl(moment, $uibModal, astirDataSvc, $location){
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
  vm.formError = "";
  vm.pageHeader = {
    title: 'Astir',
    subtitle: 'Cultura somos todos'
  };
  vm.newCost = {
    text: "",
    value: 0
  }
  vm.newEvent = {
    title: "",
    category: vm.categories[0].value,
    description: "",
    when: {
      start: moment().hours(0).minutes(0).seconds(0),
      finish: moment().hours(0).minutes(0).seconds(0).add(2, 'hours')
    },
    where: "",
    cost: []
  };
  vm.onSubmit = function (){
    var event = {
      title: vm.newEvent.title,
      category: vm.newEvent.category,
      description: vm.newEvent.description,
      when: {
        start: vm.newEvent.when.start.format(),
        finish: vm.newEvent.when.finish.format()
      },
      where: vm.newEvent.where,
      cost: vm.newEvent.cost
    }
    console.log(JSON.stringify(vm.newEvent));
    astirDataSvc.createEvent(vm.newEvent)
    .success(function (data) {
      $location.path('/dashboard/events')
    })
    .error(function (data) {
      vm.formError = "El evento no pudo ser creado. Por favor, revise que los datos hayan sido ingresados correctamente.";
    });;
  }
  vm.openCalendar = function(){
    var modalInstance = $uibModal.open({
      templateUrl: '/common/calendar-modal/calendar-modal.view.html',
      controller: 'calendarModalCtrl as vm',
      resolve: {
        dateData: function(){
          return {
            date: vm.newEvent.when
          }
        }
      }
    });
    modalInstance.result.then(function (data) {
      vm.newEvent.when = data;
    });
  };
  vm.addCost = function(){
    vm.newEvent.cost.push({
      text: vm.newCost.text,
      value: vm.newCost.value
    })
  }
  vm.removeCost = function(cost) {
    var index = vm.newEvent.cost.indexOf(cost);
    vm.newEvent.cost.splice(index, 1);
  }
}

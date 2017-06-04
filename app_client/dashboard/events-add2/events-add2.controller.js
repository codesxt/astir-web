// hrafnsmal: Pato en Steam
angular.module('AstirWebApp')
.controller('eventsAdd2Ctrl', eventsAdd2Ctrl);

function eventsAdd2Ctrl(
  moment,
  $uibModal,
  astirDataSvc,
  $location,
  $scope){
  var vm = this;
  vm.pageHeader = {
    title: 'Astir',
    subtitle: 'Cultura somos todos'
  };
  vm.categories = [
    {value: "music", name: "Música"},
    {value: "theatre", name: "Teatro"},
    {value: "opera", name: "Ópera"},
    {value: "exposition", name: "Exposición"},
    {value: "festival", name: "Festival"},
    {value: "fair", name: "Feria"},
    {value: "talk", name: "Charla"},
    {value: "movie", name: "Cine"},
    {value: "outdoors", name: "Aire Libre"}
  ];
  vm.formError = "";

  vm.newEvent = {
    title: "",
    category: vm.categories[0].value,
    description: "",
    when: {
      start: moment().hours(0).minutes(0).seconds(0),
      finish: moment().hours(0).minutes(0).seconds(0).add(2, 'hours')
    },
    where: {
      address: ""
    },
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
      where: {
        address: vm.newEvent.where.address
      },
      cost: vm.newEvent.cost
    }
    if(vm.hasLocation){
      event.where.location = {
        type: 'Point',
        coordinates: [vm.mapCursor.lng, vm.mapCursor.lat]
      };
    }
    if(event.title=="" ||
      event.category==""){
      vm.formError = "Existen campos sin completar en el formulario. Revíselos e intente nuevamente.";
    }
    var confDialog = "Al crear el evento confirma que éste está en concordancia con "+
      "las normas de conducta de Astir. ¿Desea crear el evento \""+ vm.newEvent.title +"\"?";
    var conf = confirm(confDialog);
    if(conf){
      astirDataSvc.createEvent(event)
      .success(function (data) {
        $location.path('/dashboard/events')
      })
      .error(function (data) {
        vm.formError = "El evento no pudo ser creado. Por favor, revise que los datos hayan sido ingresados correctamente.";
      });
    }
  }
  /*
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
  */
  /*
   * Event Cost options
   */
  vm.newCost = {
    text: "",
    value: 0
  }
  vm.addCost = function(){
    if(vm.newCost.text != ""){
      vm.newEvent.cost.push({
        text: vm.newCost.text,
        value: vm.newCost.value
      })
      vm.newCost.text="";
      vm.newCost.value=0;
      vm.formError = "";
    }else{
      vm.formError = "El texto asociado al costo no puede quedar vacío.";
    }
  }
  vm.removeCost = function(cost) {
    var index = vm.newEvent.cost.indexOf(cost);
    vm.newEvent.cost.splice(index, 1);
  }

   /*
    * NEW CODE TO REMOVE ALL THE SHIT
    */
   vm.durationChanged = function(){
     var hours = vm.eventDuration.getHours();
     var minutes = vm.eventDuration.getMinutes();
     var d = new Date(vm.eventStartDate.getTime());
     d.setHours(
       d.getHours() + hours,
       d.getMinutes() + minutes
     );
     vm.eventEndDate = d;
   }
   var tempDate = new Date();
   tempDate.setDate(tempDate.getDate()+1);
   tempDate.setHours(12, 0, 0, 0);
   vm.eventStartDate = tempDate;
   vm.eventEndDate = new Date();
   vm.eventDuration = new Date(0,0,0,1,30,0);
   vm.durationChanged();
   vm.calendarFormat = 'dd-MMMM-yyyy';
   vm.isCalendarOpen = false;
   vm.calendarOptions = {
    formatYear: 'yy',
    datepickerMode: 'day',
    minMode:'day',
    maxMode:'day',
    initDate: null,
    maxDate: null,
    minDate: null,
    startingDay: 1
  };
  vm.openCalendar = function(){
    vm.isCalendarOpen = true;
  }
  vm.changedTime = function(){
    vm.durationChanged();
  };
  vm.hstep = 1;
  vm.mstep = 5;
  vm.ismeridian = true;
  vm.durationIsMeridian = false;
  vm.map = {
    center: {
      latitude: -35.433333,
      longitude: -71.666667
    },
    zoom: 10,
    events: {
      click: function(map, eventName, arguments){
        vm.cursor.location.latitude = arguments[0].latLng.lat();
        vm.cursor.location.longitude = arguments[0].latLng.lng();
        $scope.$apply();
      }
    }
  };
  vm.cursor = {
    id: 0,
    location: {
      latitude: -35.433333,
      longitude: -71.666667
    }
  }
}

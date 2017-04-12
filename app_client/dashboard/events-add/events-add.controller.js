// hrafnsmal: Pato en Steam
angular.module('AstirWebApp')
.controller('eventsAddCtrl', eventsAddCtrl);

function eventsAddCtrl(moment, $uibModal, astirDataSvc, $location, $scope, leafletData){
  var vm = this;
  vm.mapCursor = {
    lat: -35.4265765,
    lng: -71.6661856
  };
  angular.extend(vm, {
    defaults: {
        scrollWheelZoom: false
    },
    center: {
      lat: vm.mapCursor.lat,
      lng: vm.mapCursor.lng,
      zoom: 15
    },
    tiles: {
      name: 'Mapbox Outdoors',
      url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
      type: 'xyz',
      options: {
        apikey: 'pk.eyJ1IjoiY29kZXN4dCIsImEiOiJjaWc4ZW95Z2YwOTRndnhrdjBvZHBxbW95In0.thmYteAR25Fu-fJH2I3ZTA',
        mapid: 'codesxt.cig8eowrz09fwt6lyhcmpfzst'
      }
    },
    markers : {
      selectedLocation: {
        lat: vm.mapCursor.lat,
        lng: vm.mapCursor.lng,
        focus: true,
        message: "Ubicación seleccionada: "+vm.mapCursor.lat+","+vm.mapCursor.lng
      }
    }
  });
  $scope.$on("leafletDirectiveMap.locationSelect.click", function(event, args){
    var leafEvent = args.leafletEvent;
    vm.mapCursor.lat = leafEvent.latlng.lat;
    vm.mapCursor.lng = leafEvent.latlng.lng;
    var message = "Ubicación seleccionada: "+vm.mapCursor.lat+","+vm.mapCursor.lng;
    var selectedLocation = {
      lat: vm.mapCursor.lat,
      lng: vm.mapCursor.lng,
      focus: true,
      message: message
    }
    angular.extend(vm, {
      markers: {selectedLocation},
      center: {
        lat: vm.mapCursor.lat,
        lng: vm.mapCursor.lng,
        zoom: 15
      },
    });
  });
  vm.categories = [
    {value: "music", name: "Música"},
    {value: "theatre", name: "Teatro"},
    {value: "opera", name: "Ópera"},
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
  vm.hasLocation = false;
  vm.toggleLocation = function(){
    vm.hasLocation = !vm.hasLocation;
    setTimeout(function(){
      leafletData.getMap().then(function (map) {
        map.invalidateSize();
      });
    }, 100);
  }
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
    console.log(JSON.stringify(event));
    astirDataSvc.createEvent(event)
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

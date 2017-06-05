angular.module('AstirWebApp', [
  'ngRoute',
  'ngAnimate',
  'ui.bootstrap',
  'angularMoment',
  'uiGmapgoogle-maps',
]);

function config ($routeProvider, $logProvider, uiGmapGoogleMapApiProvider) {
  $logProvider.debugEnabled(false);
  $routeProvider
    .when('/', {
      templateUrl: 'home/home.view.html',
      controller: 'homeCtrl',
      controllerAs: 'vm'
    })
    .when('/login', {
      templateUrl: 'login/login.view.html',
      controller: 'loginCtrl',
      controllerAs: 'vm'
    })
    .when('/dashboard/events', {
      templateUrl: 'dashboard/events-list/events-list.view.html',
      controller: 'eventsListCtrl',
      controllerAs: 'vm'
    })
    .when('/dashboard/events/add-new',{
      templateUrl: 'dashboard/events-add/events-add.view.html',
      controller: 'eventsAddCtrl',
      controllerAs: 'vm'
    })
    .when('/dashboard/events/add',{
      templateUrl: 'dashboard/events-add2/events-add2.view.html',
      controller: 'eventsAdd2Ctrl',
      controllerAs: 'vm'
    })
    .otherwise({redirectTo: '/'});

  uiGmapGoogleMapApiProvider.configure({
    //    key: 'your api key',
    key: 'AIzaSyA1NLiriGyQz7tgpRlWnbVvuW4xxbT8JR0',
    v: '3.27', //defaults to latest 3.X anyhow
    libraries: 'weather,geometry,visualization'
  });
}

angular.module('AstirWebApp')
.config(['$routeProvider', '$logProvider', 'uiGmapGoogleMapApiProvider', config]);

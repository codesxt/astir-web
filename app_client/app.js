angular.module('AstirWebApp', [
  'ngRoute',
  'ngAnimate',
  'ui.bootstrap',
  'angularMoment',
  'uiGmapgoogle-maps',
  'uiCropper',
  'ngFileUpload'
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
    .when('/dashboard/users', {
      templateUrl: 'dashboard/users/users.view.html',
      controller: 'usersCtrl',
      controllerAs: 'vm'
    })
    .when('/dashboard/userdata', {
      templateUrl: 'dashboard/userdata/userdata.view.html',
      controller: 'userdataCtrl',
      controllerAs: 'vm'
    })
    .when('/dashboard/organization', {
      templateUrl: 'dashboard/organization/organization.view.html',
      controller: 'organizationCtrl',
      controllerAs: 'vm'
    })
    .when('/dashboard/events', {
      templateUrl: 'dashboard/events-list/events-list.view.html',
      controller: 'eventsListCtrl',
      controllerAs: 'vm'
    })
    .when('/dashboard/events/add',{
      templateUrl: 'dashboard/events-add/events-add.view.html',
      controller: 'eventsAddCtrl',
      controllerAs: 'vm'
    })
    .when('/event-view/:eventId', {
      templateUrl: 'event-view/event-view.view.html',
      controller: 'eventViewCtrl',
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

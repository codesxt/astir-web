angular.module('AstirWebApp', [
  'ngRoute',
  'ngAnimate',
  'ui.bootstrap',
  'angularMoment'
]);

function config ($routeProvider) {
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
      templateUrl: 'dashboard/events-list/events-list.view.html'
    })
    .when('/dashboard/events/add-new',{
      templateUrl: 'dashboard/events-add/events-add.view.html',
      controller: 'eventsAddCtrl',
      controllerAs: 'vm'
    })
    .otherwise({redirectTo: '/'});
}

angular.module('AstirWebApp')
.config(['$routeProvider', config]);

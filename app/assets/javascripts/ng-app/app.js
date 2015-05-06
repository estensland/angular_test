'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.list'

])
// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider.otherwise({redirectTo: '/chese'});
// }]);
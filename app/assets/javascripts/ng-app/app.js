'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.list',
  'myApp.directives.taskInfo'
])
// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider.otherwise({redirectTo: '/chese'});
// }]);
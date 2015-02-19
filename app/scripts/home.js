'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: '/app/partials/home',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', [function() {

}]);
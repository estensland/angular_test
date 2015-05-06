'use strict';

angular.module('myApp.home', ['ngRoute', 'templates'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    controller: 'HomeCtrl',
    templateUrl: 'home.html'
  });
}])
.controller('HomeCtrl', ['$scope', function($scope) {
  $scope.test = 'looper'
}]);

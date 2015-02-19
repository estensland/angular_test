'use strict';

angular.module('myApp.createWords', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/create_words', {
      templateUrl: 'partials/create_words/',
      controller: 'CreateWordsCtrl',
      resolve: {
        json_grab: ['$http','$routeParams', function($http, $routeParams) {
          return 5;
        }],
      }
    });
  }])

  .controller('CreateWordsCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
    $scope.title = 'Create Words';
  }]);
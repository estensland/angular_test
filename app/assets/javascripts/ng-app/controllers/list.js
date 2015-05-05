'use strict';

angular.module('myApp.list', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/:id', {
    templateUrl: '/app/partials/home',
    controller: 'ListCtrl',
     resolve: {
        json_grab: ['$http','$routeParams', function($http, $routeParams) {
          return $http.get('/api/lists/' + $routeParams + 'tasks').then(function(response) {
            return response.data;
          });
        }],
      }
  });
}])

.controller('ListCtrl', ['$scope', 'json_grab', function($scope, json_grab ) {
  $scope.json = json_grab
}]);
console.log('asdasd')
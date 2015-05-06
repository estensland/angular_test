'use strict';

angular.module('myApp.list', ['ngRoute', 'templates'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/lists/:id/tasks', {
    templateUrl: '/javascripts/templates/list',
    controller: 'ListCtrl',
    resolve: {
      json_grab: ['$http', '$route', function($http, $route) {
        console.log('/api/lists/' + $route.current.params.id + '/tasks')
        return $http.get('/api/lists/' + $route.current.params.id + '/tasks').then(function(response) {
          return response.data;
        });
      }],
    }
  });
}])

.controller('ListCtrl', ['$scope', 'json_grab', function($scope, json_grab ) {
  console.log(json_grab)
  $scope.json = json_grab
  $scope.test = "goooper"
}]);
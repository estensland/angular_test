'use strict';

angular.module('myApp.grammar', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/grammar', {
      templateUrl: 'partials/grammar/',
      controller: 'GrammarCtrl',
      resolve: {
        json_grab: ['$http', function($http) {
          return $http.get('/api/grammar.json').then(function(response) {
            return response.data;
          });
        }],
      }
    });
  }])

  .controller('GrammarCtrl', ['$scope', 'json_grab', function($scope, json_grab) {
    $scope.title = "Grammar";
    $scope.grammar = json_grab;
  }]);
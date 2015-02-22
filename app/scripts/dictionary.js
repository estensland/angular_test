'use strict';

angular.module('myApp.dictionary', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/dictionary', {
      templateUrl: 'partials/dictionary/',
      controller: 'DictionaryCtrl',
      resolve: {
        json_grab: ['$http', function($http) {
          return $http.get('/api/roots.json').then(function(response) {
            return response.data;
          });
        }]
      }
    });
    $routeProvider.when('/dictionary/:root', {
      templateUrl: 'partials/dictionary/show.html',
      controller: 'EntryCtrl',
      resolve: {
        json_grab: ['$http','$routeParams', function($http, $routeParams) {
          return $http.get('/api/roots.json').then(function(response) {
            return response.data;
          });
        }]
      }
    });
  }])

  .controller('DictionaryCtrl', ['$scope', '$routeParams', 'json_grab', function($scope, $routeParams, json_grab) {
    $scope.title = 'Dictionary';
    $scope.codex = json_grab.codex;
    $scope.roots = json_grab.roots;
}])

  .controller('EntryCtrl', ['$scope', '$routeParams', 'json_grab', function($scope, $routeParams, json_grab) {
    $scope.title = 'Dictionary: ' + $routeParams;
    $scope.codex = json_grab.codex;
    $scope.letters = $routeParams
    $scope.root = json_grab.roots[$routeParams];

    var rootRecord = $scope.roots[root];
    var wings = [];

    for(var i = 0, ii =  rootRecord.sequence.length; i < ii; i ++){
      var codex = $scope.codex[rootRecord.sequence[i]];

      var feather = codex.replace(/\$/, root[0]);
      feather = feather.replace(/\^/, root[1]);
      feather = feather.replace(/\*/, root[2]);
      wings.push({feather: rootRecord.sequence[i].def});
    }
    $scope.root.wings = wings;
}])

'use strict';

angular.module('myApp.createWords', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/create_words/:root', {
      templateUrl: 'partials/create_words/show.html',
      controller: 'CreateWordsCtrl',
      resolve: {
        json_grab: ['$http','$routeParams', function($http, $routeParams) {
          return $http.get('/api/roots.json').then(function(response) {
            return response.data;
          });
        }],
      }
    });
  }])

  .controller('CreateWordsCtrl', ['$scope', 'json_grab', '$routeParams', function($scope, json_grab, $routeParams) {
    $scope.title = 'Create Words' + $scope.letter;;

    $scope.codex = json_grab.codex;
    $scope.letters = $routeParams.root.toUpperCase();
    $scope.root = json_grab.roots[$routeParams.root.toUpperCase()];

    var rootRecord = $scope.root;
    var wings = [];

    var objKeys = Object.keys(rootRecord.sequence)

    for(var i = 0, ii = objKeys.length; i < ii; i ++){
      var result = propogateFeathers(objKeys[i], $scope.letters, $scope.codex, rootRecord.sequence[objKeys[i]])
      if (typeof result.levels === 'object'){
        for (var z = 0, zz = result.levels.length; z < zz; z ++) {
          wings.push(result.levels[z]);
        };
      }
      else if (typeof result.ders === 'object'){
        for (var z = 0, zz = result.ders.length - 1; z < zz; z ++) {
          wings.push(result.ders[z]);
        };
      }
      else{
        wings.push(result);
      }
    }

    $scope.root.wings = wings;
  }]);
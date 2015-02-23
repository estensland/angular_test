'use strict';

var propogateFeathers = function(key, letters, codexSequence, sequence){
  var codex = codexSequence[key];
  var wing = {};

  if (codex === "l" || codex === "der" || codex === "adj" || codex === "adv") {
    console.log(key, letters, codexSequence, sequence)
  }
  else{
    var feather = codex.replace(/\$/, letters[0].toUpperCase());
    feather = feather.replace(/\^/, letters[1].toLowerCase());
    feather = feather.replace(/\*/, letters[2].toLowerCase());
    wing[feather] = {"def": sequence.def}
  }
  return wing;
}

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
        }],
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
    $scope.codex = json_grab.codex;
    $scope.letters = $routeParams.root.toUpperCase();
    $scope.title = 'Dictionary: ' + $scope.letter;
    $scope.root = json_grab.roots[$routeParams.root.toUpperCase()];

    var rootRecord = $scope.root;
    var wings = [];

    var objKeys = Object.keys(rootRecord.sequence)

    for(var i = 0, ii = objKeys.length; i < ii; i ++){
      wings.push(propogateFeathers(objKeys[i], $scope.letters, $scope.codex, rootRecord.sequence[objKeys[i]]));
    }
    $scope.root.wings = wings;
}])

'use strict';

var propogateFeathers = function(key, letters, codexSequence, sequence){
  var wing = {};
  if (key === "l"){wing.levels = []}
  else if (key === "der"){wing.ders = []}

  if (key === "l" || key === "der" || key === "adj" || key === "adv") {
    for (var i = 0, ii = Object.keys(sequence).length; i < ii; i ++){
      for (var y = 0, yy = Object.keys(sequence[Object.keys(sequence)[i]]).length; y < yy; y ++){
        if (key === "l"){
          var middleKey = Object.keys(sequence)[i]
          var subKey = Object.keys(sequence[middleKey])[y]
          var codex = codexSequence[key][middleKey] + codexSequence[subKey]
          var feather = codex.replace(/\$/, letters[0].toLowerCase());
          feather = feather.replace(/\^/, letters[1].toLowerCase());
          feather = feather.replace(/\*/, letters[2].toLowerCase());
          feather = feather.charAt(0).toUpperCase() + feather.slice(1);

          var comboKey = key + middleKey + subKey;

          wing.levels.push({form: comboKey, feather: feather, def: sequence[middleKey][subKey].def})
        }
        else if (key === "der"){
          var middleKey = Object.keys(sequence)[i]
          var subKey = Object.keys(sequence[middleKey])[y]
          var codex =  codexSequence[subKey] + 'a' + codexSequence[key][middleKey - 1]

          var feather = codex.replace(/\$/, letters[0].toLowerCase());
          feather = feather.replace(/\^/, letters[1].toLowerCase());
          feather = feather.replace(/\*/, letters[2].toLowerCase());
          feather = feather.charAt(0).toUpperCase() + feather.slice(1);

          var comboKey = middleKey + subKey;

          wing.ders.push({form: comboKey, feather: feather, def: sequence[middleKey][subKey].def})
        }
      }
    }
  }
  else{
    var codex = codexSequence[key];
    var feather = codex.replace(/\$/, letters[0].toLowerCase());
    feather = feather.replace(/\^/, letters[1].toLowerCase());
    feather = feather.replace(/\*/, letters[2].toLowerCase());
    feather = feather.charAt(0).toUpperCase() + feather.slice(1);
    wing = {form: key, feather: feather, def: sequence.def}
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
}])

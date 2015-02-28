'use strict';

var flattenObject = function(ob) {
  // https://gist.github.com/penguinboy/762197
  var toReturn = {};

  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if ((typeof ob[i]) == 'object') {
      var flatObject = flattenObject(ob[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[i + '.' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};

var generateCodex = function(key, masterCodex){
  var skeletonCodex = "";
  for (var i = 0, ii = key.length; i < ii; i++) {
    var codexFraction = masterCodex[key[i]];

    if(!codexFraction){
      codexFraction = masterCodex[key[i+1]];
      codexFraction = codexFraction[key[i]];
      i++;
   }
   if (key[i] === 'd'){
    var vowelHarmony = skeletonCodex.match(/a/) ? 'a' : 'e'
    skeletonCodex = skeletonCodex.replace(/\*/, '*' + vowelHarmony + codexFraction);
   }
   else{
    skeletonCodex = codexFraction + skeletonCodex;
   }
  };
  return skeletonCodex;
}

var propogateFeather = function(key, letters){
  letters = letters.toLowerCase()
  return key.replace(/\$/, letters[0]).replace(/\^/, letters[1]).replace(/\*/, letters[2])
}

var processKey = function(key){
  var splitKey = key.split('.').reverse();
  splitKey.shift()
  return splitKey
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

    var flatObj = flattenObject(rootRecord.sequence);
    var objKeys = Object.keys(flatObj);

    for(var i = 0, ii = objKeys.length; i < ii; i ++){
      var processedKey = processKey(objKeys[i])
      var specificCodex = generateCodex(processedKey, $scope.codex);
      var feather = propogateFeather(specificCodex,$scope.letters)
      wings.push({form: processedKey.reverse().join(''), feather: feather, def:flatObj[objKeys[i]]});
    }
    $scope.root.wings = wings;
}])

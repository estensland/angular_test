'use strict';

// var flattenObject = function(ob) {
//   // https://gist.github.com/penguinboy/762197
//   var toReturn = {};

//   for (var i in ob) {
//     if (!ob.hasOwnProperty(i)) continue;

//     if ((typeof ob[i]) == 'object') {
//       var flatObject = flattenObject(ob[i]);
//       for (var x in flatObject) {
//         if (!flatObject.hasOwnProperty(x)) continue;

//         toReturn[i + '.' + x] = flatObject[x];
//       }
//     } else {
//       toReturn[i] = ob[i];
//     }
//   }
//   return toReturn;
// };

// var generateCodex = function(key, masterCodex){
//   var skeletonCodex = "";
//   for (var i = 0, ii = key.length; i < ii; i++) {
//     var codexFraction = masterCodex[key[i]];

//     if(!codexFraction){
//       codexFraction = masterCodex[key[i+1]];
//       codexFraction = codexFraction[key[i]];
//       i++;
//    }
//    if (key[i] === 'd'){
//     var vowelHarmony = skeletonCodex.match(/a/) ? 'a' : 'e'
//     skeletonCodex = skeletonCodex.replace(/\*/, '*' + vowelHarmony + codexFraction);
//    }
//    else{
//     skeletonCodex = codexFraction + skeletonCodex;
//    }
//   };
//   return skeletonCodex;
// }

// var propogateFeather = function(key, letters){
//   letters = letters.toLowerCase()
//   return key.replace(/\$/, letters[0]).replace(/\^/, letters[1]).replace(/\*/, letters[2])
// }

// var processKey = function(key){
//   var splitKey = key.split('.').reverse();
//   splitKey.shift()
//   return splitKey
// }

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

  .controller('CreateWordsCtrl', ['$scope', '$http', 'json_grab', '$routeParams', function($scope, $http, json_grab, $routeParams) {
    $scope.title = 'Create Words';
    $scope.letters = $routeParams.root.toUpperCase();
    $scope.root = json_grab.roots[$routeParams.root.toUpperCase()];
    json_grab.loooper = 'cheese'
    $scope.json = json_grab

    $scope.save = function(){
      console.log($scope.json)
      $http.get('/api/roots.json', $scope.json).then(function(data) {
        $scope.msg = 'Data saved';
      });
    }
  }]);
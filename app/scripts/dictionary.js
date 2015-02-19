'use strict';

angular.module('myApp.dictionary', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/dictionary', {
      templateUrl: 'partials/dictionary/',
      controller: 'DictionaryCtrl',
      resolve: {
        words: ['$http', function($http) {
          return $http.get('/api/words.json').then(function(response) {
            return response.data;
          });
        }]
      }
    });
  }])

  .controller('DictionaryCtrl', ['$scope', '$routeParams', 'words', function($scope, $routeParams, words) {
    $scope.title = 'Dictionary';
    $scope.words = words;
}])

'use strict';

angular.module('app')

.controller('HomeCtrl', function($scope, items) {
  $scope.items = items;
});

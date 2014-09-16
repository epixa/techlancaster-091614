'use strict';

angular.module('app')

.controller('ItemCtrl', function($scope, $location, item) {
  $scope.$root.current = { url: $location.path(), name: item.name };
  $scope.item =  item;

  $scope.data = angular.copy(item);
  $scope.save = function(data) {
    item.name = data.name;
    item.description = data.description;
    item.save();
    $scope.editing = false;
  };
});

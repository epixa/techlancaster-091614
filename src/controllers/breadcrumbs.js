'use strict';

angular.module('app')

.controller('BreadcrumbsCtrl', function($scope, $routeParams, itemService) {
  $scope.$on('$routeChangeSuccess', function() {
    if ($routeParams.id) {
      itemService.one($routeParams.id).then(function(item) {
        $scope.current = item;
      });
    } else {
      $scope.current = null;
    }
  });
});

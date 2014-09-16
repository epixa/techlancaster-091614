'use strict';

angular.module('app')

.controller('BreadcrumbsCtrl', function($scope, $location) {
  $scope.$on('$routeChangeSuccess', function() {
    if ($location.path() === '/') {
      $scope.$root.current = { url: '/' };
    }
  });
});

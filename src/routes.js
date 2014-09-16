'use strict';

angular.module('app').config(function($routeProvider) {
  $routeProvider
  .when('/', { controller: 'HomeCtrl', templateUrl: '/static/views/home.html', resolve: {
    items: function(itemService) {
      return itemService.all();
    }
  } })
  .when('/item/:id', { controller: 'ItemCtrl', templateUrl: '/static/views/item.html', resolve: {
    item: function($route, itemService) {
      return itemService.one($route.current.params['id']);
    }
  } })
});

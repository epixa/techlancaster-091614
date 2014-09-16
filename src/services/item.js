'use strict';

angular.module('app')

.factory('itemService', function($http, $window) {
  var service = {
    all: function() {
      return $http.get('/api/items').then(extract).then(function(items) {
        return items.map(modelIt);
      });
    },
    one: function(id) {
      return $http.get('/api/items/' + id)
        .then(extract)
        .then(modelIt);
    },
    save: function(id, data) {
      return $http.put('/api/items/' + id, data)
        .then(extract)
        .then(modelIt);
    }
  };

  function extract(response) {
    return response.data;
  }

  function modelIt(item) {
    item.path = '/items/' + item.id;
    item.save = function() {
      return service.save(this.id, this);
    };
    return item;
  }

  return service;
});

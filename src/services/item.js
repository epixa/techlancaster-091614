'use strict';

angular.module('app')

.factory('itemService', function($http) {
  var service = {
    all: function() {
      return $http.get('/api/items').then(extract).then(function(items) {
        return items.map(modelIt);
      });
    },
    one: function(id) {
      return $http.get('/api/items/' + id).then(extract).then(modelIt);
    },
    save: function(id, data) {
      return $http.put('/api/items/' + id, data).then(extract).then(modelIt);
    }
  };

  function extract(response) {
    return response.data;
  }

  function modelIt(item) {
    item.save = function() {
      return service.save(item.id, item);
    };
    return item;
  }

  return service;
});

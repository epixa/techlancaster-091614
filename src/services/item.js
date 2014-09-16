'use strict';

angular.module('app')

.factory('itemService', function($http, $window, modelCache) {
  var service = {
    all: function() {
      return $http.get('/api/items').then(extract).then(function(items) {
        return items.map(modelIt).map(syncModel);
      });
    },
    one: function(id) {
      return $http.get('/api/items/' + id)
        .then(extract)
        .then(modelIt)
        .then(syncModel);
    },
    save: function(id, data) {
      return $http.put('/api/items/' + id, data)
        .then(extract)
        .then(modelIt)
        .then(syncModel);
    }
  };

  function syncModel(model) {
    if (!modelCache[model.path]) {
      modelCache[model.path] = model;
    } else {
      angular.extend(modelCache[model.path], model);
    }
    return modelCache[model.path];
  }

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

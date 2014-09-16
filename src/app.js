'use strict';

angular.module('app', [
  'ngRoute'
])

.config(function($locationProvider, $httpProvider) {
  $locationProvider.html5Mode(true);

  $httpProvider.defaults

  $httpProvider.interceptors.push(function($window, $q) {
    return {
      responseError: function(response) {
        if (response.status === 400 && response.data.error === 'client-out-of-date') {
          alert('Client version is out of date, refreshing');
          $window.location = $window.location;
        }
        return $q.reject(response);
      }
    };
  });
})

.run(function($http, apiVersion) {
  $http.defaults.headers.common['x-client-version'] = apiVersion;
});

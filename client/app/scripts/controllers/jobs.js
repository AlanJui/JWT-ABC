'use strict';

/**
 * @ngdoc function
 * @name jwtApp.controller:JobsCtrl
 * @description
 * # JobsCtrl
 * Controller of the jwtApp
 */
angular.module('jwtApp')
  .controller('JobsCtrl', function ($http, API_URL, alert) {
    var self = this;

    $http.get(API_URL + 'jobs')
      .success(function (jobs) {
        self.jobs = jobs;
      })
      .error(function (err) {
        alert('warning', 'Unable to get jobs', err.message);
      });

  });

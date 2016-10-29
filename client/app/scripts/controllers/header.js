'use strict';

/**
 * @ngdoc function
 * @name jwtApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the jwtApp
 */
angular.module('jwtApp')
  .controller('HeaderCtrl', function ($auth) {
    var vm = this;

    vm.isAuthenticated = function () {
      return $auth.isAuthenticated();
    };

  });

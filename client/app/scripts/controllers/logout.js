'use strict';

/**
 * @ngdoc function
 * @name jwtApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the jwtApp
 */
angular.module('jwtApp')
  .controller('LogoutCtrl', function ($auth, $state) {
    $auth.logout();
    $state.go('main');
  });

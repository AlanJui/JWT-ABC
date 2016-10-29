'use strict';

/**
 * @ngdoc service
 * @name jwtApp.alert
 * @description
 * # alert
 * Service in the jwtApp.
 */
angular.module('jwtApp')
  .service('alert', [
    '$rootScope',
    '$timeout',
    function ($rootScope, $timeout) {
      // AngularJS will instantiate a singleton by calling "new" on this function
      return function (type, title, message, timeout) {
        var alertTimeout;

        $rootScope.alert = {
          hasBeenShown: true,
          show: true,
          type: type,
          message: message,
          title: title
        };
        $timeout.cancel(alertTimeout);
        alertTimeout = $timeout(function () {
          $rootScope.alert.show = false;
        }, timeout || 5000);
      };
    }
  ]);

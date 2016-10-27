'use strict';

/**
 * @ngdoc service
 * @name jwtApp.auth
 * @description
 * # auth
 * Service in the jwtApp.
 */
angular.module('jwtApp')
  .service('auth', function ($http, API_URL, authToken, $state) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    function authSuccessful(res) {
      authToken.setToken(res.token);
      $state.go('main');
    }

    this.login = function (email, password) {
      var url = API_URL + 'login';

      return $http.post(url, {
        email: email,
        password: password
      }).success(authSuccessful);
    };

    this.register = function (email, password) {
      var url = API_URL + 'register';

      return $http.post(url, {
        email: email,
        password: password
      }).success(authSuccessful);
    };
  });

'use strict';

/**
 * @ngdoc service
 * @name jwtApp.authToken
 * @description
 * # authToken
 * Factory in the jwtApp.
 */
angular.module('jwtApp')
  .factory('authToken', function ($window) {

    var TOKEN_NAME = 'userToken';

    var storage = $window.localStorage;
    // var isAuthenticated = false;
    var cachedToken;

    // Public API here
    var authToken = {

      setToken: function (token) {
        cachedToken = token;
        storage.setItem(TOKEN_NAME, token);
        // isAuthenticated = true;
      },

      getToken: function () {
        if (!cachedToken) {
          cachedToken = storage.getItem(TOKEN_NAME)
        }
        return cachedToken;
      },

      isAuthenticated: function () {
        return !!this.getToken();
      },

      removeToken: function () {
        cachedToken = null;
        storage.removeItem(TOKEN_NAME);
        // isAuthenticated = false;
      }
    };

    return authToken;
  });

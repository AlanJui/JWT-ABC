'use strict';

/**
 * @ngdoc service
 * @name jwtApp.auth
 * @description
 * # auth
 * Service in the jwtApp.
 */
angular.module('jwtApp')
  .service('auth', function ($http, API_URL, authToken, $state, $window, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    function authSuccessful(token) {
      authToken.setToken(token);
      $state.go('main');
    }

    this.login = function (email, password) {
      var url = API_URL + 'login';

      return $http.post(url, {
        email: email,
        password: password
      }).success(function (response) {
        authSuccessful(response.token);
      });
    };

    this.register = function (email, password) {
      var url = API_URL + 'register';

      return $http.post(url, {
        email: email,
        password: password
      }).success(function (response) {
        authSuccessful(response.token);
      });
    };

    var urlBuilder = [];
    var CLIENT_ID = '121521559049-pfd0m1ap65ue7fkfutsosvo3qqe7152n.apps.googleusercontent.com';

    urlBuilder.push(
      'response_type=code',
      'client_id=' + CLIENT_ID,
      'redirect_uri=' + window.location.origin,
      'scope=profile email'
    );

    /**
     * Get "Authorization Code"
     * [Step 1]: User login & consent
     * [Step 2]: Get authorization code by callback event
     * @returns {Function}
     */
    this.googleAuth = function () {
      var deferred = $q.defer();

      // Step 1: User login & consent
      var url = 'https://accounts.google.com/o/oauth2/v2/auth'
                + '?'
                + urlBuilder.join('&');
      var options = 'width=500, height=500'
                    + ', left=' + ($window.outerWidth - 500) / 2
                    + ', top=' + ($window.outerHeight - 500) / 2.5;

      var popUp = $window.open(url, '', options);
      $window.focus();

      // Step 2: Get authorization code
      $window.addEventListener('message', function (event) {
        if (event.origin === $window.location.origin) {
          // console.log(event.data);
          var code = event.data;
          popUp.close();

          // Step 3: Exchange code for token
          $http.post(API_URL + 'auth/google', {
            code: code,
            clientId: CLIENT_ID,
            redirectUri: window.location.origin
          })
            .then(function successCallback(response) {
              // Step 3.1: Token response
              authSuccessful(response.data.token);   // response is JWT
              deferred.resolve(response);
            }, function errorCallback(response) {
              // response.data.error = {
              //   code: 401
              //   errors: <Array>
              //   message: string
              // }
              console.log('Error: ' + response);
              response.err = response.data.error;
            });
        }

      });

      return deferred.promise;
    };

  });

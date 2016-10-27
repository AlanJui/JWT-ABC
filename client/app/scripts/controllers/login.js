'use strict';

/**
 * @ngdoc function
 * @name jwtApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the jwtApp
 */
angular.module('jwtApp')
  .controller('LoginCtrl', function ($http, API_URL, alert, authToken) {

    var url = API_URL + 'login';

    this.submit = function () {
      var user = {
        email: this.email,
        password: this.password
      };

      $http.post(url, user)
        .success(function (res) {
          alert(
            'success',
            'Welcome!',
            'Thanks for coming back ' + res.user.email + '!'
          );
          authToken.setToken(res.token);
        })
        .error(function (err) {
          alert('warning', 'Something went wrong :(', err.message);
        });
    };

  });

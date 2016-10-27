'use strict';

/**
 * @ngdoc function
 * @name jwtApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the jwtApp
 */
angular.module('jwtApp')
  .controller('LoginCtrl', function (auth, alert) {

    this.submit = function () {

      auth.login(this.email, this.password)
        .success(function (res) {
          alert(
            'success',
            'Welcome!',
            'Thanks for coming back ' + res.user.email + '!'
          );
        })
        .error(function (err) {
          alert('warning', 'Something went wrong :(', err.message);
        });
    };

  });

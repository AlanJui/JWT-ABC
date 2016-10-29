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

    function handleError(err) {
      alert('warning', 'Something went wrong :(', err.message);
    }

    this.submit = function () {

      auth.login(this.email, this.password)
        .success(function (res) {
          alert(
            'success',
            'Welcome!',
            'Thanks for coming back ' + res.user.email + '!'
          );
        })
        .error(handleError);
    };

    this.google = function () {

      // console.log('run auth.googleAuth()!');
      auth.googleAuth()
        .then(function (response) {
          console.log(response);
          alert(
            'success',
            'Thanks for coming back ' + response.data.user.displayName + '!'
          );
        }, handleError);
    };

  });


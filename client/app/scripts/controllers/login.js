'use strict';

/**
 * @ngdoc function
 * @name jwtApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the jwtApp
 */
angular.module('jwtApp')
  .controller('LoginCtrl', function (auth, $auth, alert) {
    var vm = this;

    function handleError(err) {
      alert('warning', 'Something went wrong :(', err.message);
    }

    vm.submit = function () {

      $auth.login({
        email: vm.email,
        password: vm.password
      })
        .then(function (res) {
          var message = 'Thanks for coming back ' + res.data.user.email + '!';
          if (!res.data.user.active) {
            message = 'Just a reminder, please activate your account soon :)!';
          }

          alert(
            'success',
            'Welcome!',
            message
          );
        })
        .catch(handleError);
    };

    vm.authenticate = function (provider) {

      $auth.authenticate(provider)
        .then(function (response) {
          console.log(response);
          alert(
            'success',
            'Welcome!',
            'Thanks for coming back ' + response.data.user.displayName + '!'
          );
        })
        .catch(handleError);
    };

    vm.google = function () {

      // console.log('run auth.googleAuth()!');
      auth.googleAuth()
        .then(function (response) {
          console.log(response);
          alert(
            'success',
            'Welcome!',
            'Thanks for coming back ' + response.data.user.displayName + '!'
          );
        })
        .catch(handleError);
    };

  });


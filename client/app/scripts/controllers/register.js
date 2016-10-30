'use strict';

/**
 * @ngdoc function
 * @name jwtApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the jwtApp
 */
angular.module('jwtApp')
  .controller('RegisterCtrl', function ($scope, auth, alert) {

    $scope.submit = function () {

      auth.register($scope.email, $scope.password)
        .success(function (res) {
          var message = 'Wlcome, ' + res.user.email + '!'
                      + 'Please activate your account in the next 2 days.'

          alert(
            'success',
            'Account Created!',
            message
          );
        })
        .error(function (err) {
          alert('warning', 'Opps! Could not registered.', err.message);
        });

    };

  });

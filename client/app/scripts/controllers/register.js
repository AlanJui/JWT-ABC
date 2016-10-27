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
          alert(
            'success',
            'Account Created!',
            'Wlcome, ' + res.user.email + '!'
          );
        })
        .error(function (err) {
          alert('warning', 'Opps! Could not registered.', err.message);
        });

    };

  });

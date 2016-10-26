'use strict';

/**
 * @ngdoc function
 * @name jwtApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the jwtApp
 */
angular.module('jwtApp')
  .controller('RegisterCtrl', function ($scope, $rootScope, $http, alert, authToken) {

    $scope.submit = function () {
      // console.log('RegisterCtrl');

      var url = 'http://localhost:3000/register';
      var user = {
        email: $scope.email,
        password: $scope.password
      };

      $http.post(url, user)
        .success(function (res) {
          // console.log('Good');
          authToken.setToken(res.token);
          alert('success', 'OK!', 'You are now registered');
        })
        .error(function (err) {
          // console.log('Bad');
          alert('warning', 'Opps!', 'Could not registered.');
        });
    };

  });

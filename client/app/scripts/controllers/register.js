'use strict';

/**
 * @ngdoc function
 * @name jwtApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the jwtApp
 */
angular.module('jwtApp')
  .controller('RegisterCtrl', function ($scope, $rootScope, $http, alert, authToken, $state) {

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
          alert(
            'success',
            'Account Created!',
            'Wlcome, ' + res.user.email + '!'
          );
          authToken.setToken(res.token);
          // $state.go('main');
        })
        .error(function (err) {
          // console.log('Bad');
          alert('warning', 'Opps!', 'Could not registered.');
        });
    };

  });

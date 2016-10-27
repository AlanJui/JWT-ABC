'use strict';

/**
 * @ngdoc function
 * @name jwtApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the jwtApp
 */
angular.module('jwtApp')
  .controller('RegisterCtrl', function ($scope, $http, API_URL, alert, authToken) {

    $scope.submit = function () {

      var url = API_URL + 'register';
      var user = {
        email: $scope.email,
        password: $scope.password
      };

      $http.post(url, user)
        .success(function (res) {
          alert(
            'success',
            'Account Created!',
            'Wlcome, ' + res.user.email + '!'
          );
          authToken.setToken(res.token);
        })
        .error(function (err) {
          alert('warning', 'Opps! Could not registered.', err.message);
        });
    };

  });

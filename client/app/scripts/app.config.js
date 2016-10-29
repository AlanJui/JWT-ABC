'use strict';

angular.module('jwtApp')

  .constant('API_URL', 'http://localhost:3000/')

  .config(function ($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: '/views/main.html'
      })

      .state('jobs', {
        url: '/jobs',
        templateUrl: '/views/jobs.html',
        controller: 'JobsCtrl',
        controllerAs: 'ctrl'
      })

      .state('register', {
        url: '/register',
        templateUrl: '/views/register.html',
        controller: 'RegisterCtrl'
      })

      .state('login', {
        url: '/login',
        templateUrl: '/views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'ctrl'
      })

      .state('logout', {
        url: '/logout',
        controller: 'LogoutCtrl'
      });

  })

  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })

  .config(function ($authProvider, API_URL) {
    $authProvider.google({
      clientId: '121521559049-pfd0m1ap65ue7fkfutsosvo3qqe7152n.apps.googleusercontent.com',
      url: API_URL + 'auth/google'
    });
  })

  .run(function ($window) {

    var params = $window.location.search.substring(1);
    console.log(params);

    if (params && window.opener.location.origin === $window.location.origin) {
      var pair = params.split('=');
      var code = decodeURIComponent(pair[1]);

      // get Authorization code from Google API and pass it by event message
      $window.opener.postMessage(code, $window.location.origin);
    }
  });

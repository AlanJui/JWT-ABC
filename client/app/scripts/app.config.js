'use strict';

angular.module('jwtApp')

  .constant('API_URL', 'http://localhost:3000/')

  .config(function ($urlRouterProvider, $stateProvider, $httpProvider) {

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

    $httpProvider.interceptors.push('authInterceptor');

  });

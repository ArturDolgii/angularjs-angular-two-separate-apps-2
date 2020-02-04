'use strict';

angular.
  module('phonecatApp').
  config(['$routeProvider', '$locationProvider',
    function config($routeProvider, $locationProvider) {
      $locationProvider.hashPrefix('');
      $routeProvider.
        when('/phones/:phoneId', {
          template: '<phone-detail></phone-detail>'
        });
    }
  ]);

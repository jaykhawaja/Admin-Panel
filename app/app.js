'use strict';

// Declare app level module which depends on views, and components init
angular.module('myApp', [
  'ngRoute',
  'ngFileUpload',
  'myApp.adminLogin',
  'myApp.adminDashboard',
  'myApp.adminAdd',
  'myApp.addVoucher',
  'myApp.deleteVoucher',
  'myApp.editVoucher',
  'myApp.addBrand',
  'myApp.editBrand',
  'myApp.auth',
  // 'myApp.tokenInterceptor',
  'myApp.version'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/login'});
}]);

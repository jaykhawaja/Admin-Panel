'use strict';

// Declare app level module which depends on views, and components init
angular.module('myApp', [
  'ngRoute',
  'ngStorage',
  'ngFileUpload',
  'myApp.auth',
  'cloudinary',
  'myApp.adminLogin',
  'myApp.adminDashboard',
  'myApp.adminAdd',
  'myApp.addVoucher',
  'myApp.deleteVoucher',
  'myApp.editVoucher',
  'myApp.addBrand',
  'myApp.editBrand',
  'myApp.version'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/login'});
}]);

'use strict';

angular.module('myApp.adminDashboard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'src/admin/Dashboard/dashboard.html',
    controller: 'adminDashboardCtrl'
  });
}])

.controller('adminDashboardCtrl', [function() {
   $scope.hello = "oye";
}]);
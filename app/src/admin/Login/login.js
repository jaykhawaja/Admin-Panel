'use strict';

angular.module('myApp.adminLogin', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'src/admin/Login/login.html',
    controller: 'View1Ctrl'
  });
}])

.controller('LoginCtrl', [function() {

}]);
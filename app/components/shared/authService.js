'use strict';

angular.module('myApp.auth', [])
.controller('authController', [function () {

}])
.service('authService', ['$window', function($window){

  this.isLoggedIn = false;

  this.isUserLoggedIn = function () {
        console.log('this is logged in', this.isLoggedIn);
       return this.isLoggedIn; 
  }

}]);
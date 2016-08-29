'use strict';

angular.module('myApp.auth', [])
.controller('authController', [ '$scope','$window', 'authService', function ($scope, $window, authService) {
  
  $scope.logout = function () {
  	console.log(authService.isUserLoggedIn() );
  	console.log('logging out user');
  	authService.logOut;
 	$window.sessionStorage.clear();
  	$window.location.href="#!/login";
  };

}])
.service('authService', [ '$window', function($window){

  this.isLoggedIn = false;

  this.getToken = function () {
  	 return $window.sessionStorage['token'];
  }

  this.isUserLoggedIn = function () {
  	var token = this.getToken();
  	if (token) {
  		this.isLoggedIn = true
  		return true;
    	} else {
  		return false;
  	}      
  };

  this.logOut = function () {
  	 this.isLoggedIn = false;
  }

  

}]);
"use strict";

angular.module('myApp.auth', [])
.controller('authController', [ '$scope','$window', '$localStorage', 'authService', function ($scope, $window, $localStorage, authService) {
  
  $scope.logout = function () {
    authService.logOut();
    delete $localStorage.token;    
    delete $localStorage.source_id;    
    $window.location.href="#!/login";
  };

}])
.service('authService', ['$rootScope' ,'$localStorage',  function($rootScope, $localStorage){


  this.isLoggedIn = false;
  this.getToken = function () {
      console.log('LOCAL STORAGE TOKEN', $localStorage.token);
     return $localStorage.token;
  };

  this.getSourceId = function () {
    console.log('local storage SOURCE ID', $localStorage.source_id);
     return $localStorage.source_id;
  };

  this.isUserLoggedIn = function () {
  	var token = this.getToken();
  	if (token) {
  		  this.isLoggedIn = true;
  		  return true;
    	} else {
  		return false;
  	}      
  };

  this.logOut = function () {
  	 this.isLoggedIn = false;
  }

  

}]);
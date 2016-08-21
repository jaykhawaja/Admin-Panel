'use strict';

angular.module('myApp.tokenInterceptor', [])
.factory('tokenService', ['$window', function($window){
	console.log('token factory loaded');

}]);
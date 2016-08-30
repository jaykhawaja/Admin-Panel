"use strict";

angular.module('myApp.deleteVoucher', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/delete_voucher', {
    controller: 'deleteVoucherCtrl'
  });
}])
.controller('deleteVoucherCtrl', ['$scope', 'deleteVoucherService', function($scope, deleteVoucherService) {
	console.log('delete voucher loaded');

	$scope.deleteVoucher = function(model) {
		console.log('delete vouhcer called');
		//UNCOMMENT AND USE WHEN CDELETING VIA CTRLR ON PAGE
		// deleteVoucherService.delete(model)
		// .success(function(res, status, headers, config){
			// console.log('res success', res);
		// })
		// .error(function(res, status, headers, config){
			// console.log('res success', res);
		// });
	};
}])
.service('deleteVoucherService', ['$http', '$window', function ($http, $window) {
	console.log('delete service loaded');

	var SESSION_TOKEN, SOURCE_ID, DELETE_API_URL, DELETE_BRANDS_URLheaders;

	SESSION_TOKEN = $window.localStorage['token'];
	SOURCE_ID = $window.localStorage['source_id'];
	DELETE_API_URL = 'https://book-of-vouchers.herokuapp.com/api/v1/admin/delete_voucher';
	DELETE_BRANDS_URLheaders = {
	    headers: 
	    { 
	    	'Content-Type': 'application/json',
	        'token': SESSION_TOKEN,
	        'source_id': SOURCE_ID
	    }
	    
	 };
	
	this.delete = function (model) {
		return $http.delete(DELETE_API_URL, model, DELETE_BRANDS_URLheaders);
	};


}]);
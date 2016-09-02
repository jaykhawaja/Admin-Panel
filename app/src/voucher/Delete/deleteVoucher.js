"use strict";

angular.module('myApp.deleteVoucher', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/delete_voucher', {
    controller: 'deleteVoucherCtrl'
  });
}])
.controller('deleteVoucherCtrl', ['$scope', 'deleteVoucherService', function($scope, deleteVoucherService) {
	console.log('delete voucher loaded');

}])
.service('deleteVoucherService', ['$http', '$localStorage','authService', function ($http, $localStorage, authService) {

	var SESSION_TOKEN, SOURCE_ID, DELETE_API_URL, DELETE_BRANDS_URLheaders;

	SESSION_TOKEN  = authService.getToken();
	SOURCE_ID      = authService.getSourceId();
	DELETE_API_URL = 'https://book-of-vouchers.herokuapp.com/api/v1/admin/delete_voucher';
	DELETE_BRANDS_URLheaders = {
	    headers: 
	    { 
	    	'Content-Type': 'application/json',
	        'token': SESSION_TOKEN,
	        'source_id': SOURCE_ID
	    }
	    
	 };

	this.deleteVoucher = function (model) {
	 console.log('deleting with SESSION_TOKEN', SESSION_TOKEN);
	 console.log('deleting with SOURCE_ID', SOURCE_ID);
	 console.log('deleting with DELETE_BRANDS_URLheaders', DELETE_BRANDS_URLheaders);
	 console.log('deleting model', model);
	
			return $http.delete(DELETE_API_URL, model);
	};


}]);
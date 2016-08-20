'use strict';

angular.module('myApp.deleteVoucher', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/delete_voucher', {
    controller: 'deleteVoucherCtrl'
  });
}])
.controller('deleteVoucherCtrl', ['$scope', 'deleteVoucherService', function($scope, deleteVoucherService) {
	console.log('delete voucher loaded');

	$scope.deleteVoucher = function() {
		console.log('delete vouhcer called');
		// deleteVoucherService.delete();
	};
}])
.service('deleteVoucherService', ['$http', function ($http) {
	console.log('delete service loaded');

	var deleteVoucherService = function ($http) {
		this.http_ = $http;
	};

	deleteVoucherService.prototype.delete = function () {
		console.log('delete voucher request received');
	};
}]);
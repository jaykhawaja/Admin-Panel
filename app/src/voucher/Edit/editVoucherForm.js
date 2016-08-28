'use strict';

angular.module('myApp.editVoucher', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/edit_voucher', {
    templateUrl: 'app/src/voucher/Edit/editVoucherForm.html',
    controller: 'editVoucherFormCtrl'
  });
}])

.controller('editVoucherFormCtrl', ['$scope' ,'$window' , 'editVoucherService', function($scope, $window, editVoucherService) {
	$scope.edit = function () {
		editVoucherService.edit();
	}
}])
.service('editVoucherService', ['$http' , '$window', function ($http, $window) {
	var editVoucherService = function () {
		this.http_ = $http;
	};

	editVoucherService.prototype.edit = function () {
		console.log('edit voucher form');
	}

}]);
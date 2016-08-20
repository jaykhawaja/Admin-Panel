'use strict';

angular.module('myApp.editVoucher', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/edit_voucher', {
    templateUrl: 'src/voucher/Edit/editVoucherForm.html',
    controller: 'editVoucherFormCtrl'
  });
}])

.controller('editVoucherFormCtrl', ['$scope', 'editVoucherService', function($scope, editVoucherService) {
	$scope.edit = function () {
		editVoucherService.edit();
	}
}])
.service('editVoucherService', ['$http', function ($http) {
	var editVoucherService = function () {
		this.http_ = $http;
	};

	editVoucherService.prototype.edit = function () {
		console.log('edit voucher form');
	}

}]);
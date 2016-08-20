'use strict';

angular.module('myApp.addVoucher', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/add_voucher', {
    templateUrl: 'src/voucher/Add/addVoucherForm.html',
    controller: 'addVoucherFormCtrl'
  });
}])
.controller('addVoucherFormCtrl', ['$scope', 'addVoucherService', function($scope, addVoucherService) {
	   $scope.add = function () {
	   	 	addVoucherService.add();
	   }
}])
.service('addVoucherService', ['$http', function ($http) {
	var addVoucherService = function () {
		this.http_ = $http;
	};

	addVoucherService.prototype.add = function () {
		console.log('add voucher form');
	}

}]);
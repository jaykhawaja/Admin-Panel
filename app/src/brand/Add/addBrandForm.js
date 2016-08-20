'use strict';

angular.module('myApp.addBrand', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/add_brand', {
    templateUrl: 'src/brand/Add/addBrandForm.html',
    controller: 'addBrandFormCtrl'
  });
}])
.controller('addBrandFormCtrl', ['$scope', 'addBrandService', function($scope, addBrandService) {
	$scope.create = function () {
		addBrandService.create();
	};
}])
.service('addBrandService', [ '$http', function ($http){
	var addBrandService = function ($http) {
		this.http_ = $http;
	}

	addBrandService.prototype.create = function () {
		console.log('create brand');
	}
}])
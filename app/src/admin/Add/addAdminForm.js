'use strict';

angular.module('myApp.adminAdd', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/add_admin', {
    templateUrl: 'src/admin/Add/addAdminForm.html',
    controller: 'adminAddCtrl'
  });
}])
.controller('adminAddCtrl', ['$scope','adminAddService', function($scope, adminAddService) {
  	
  	$scope.add = function() {
  		console.log('login received');
  		adminAddservice.add();

  	}
}])
.service('adminAddService', ['$http', function($http){

var adminAddService = function () 
{
	this.http_ = $http;
};

adminAddService.prototype.add = function () 
{
   console.log('admin service add');
}

}]);
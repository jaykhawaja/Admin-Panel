/**
* @fileoverview - Includes the logic and voucher service calls for the dashboard
* @author Jay Khawaja
*/
'use strict';

angular.module('myApp.adminDashboard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'src/admin/Dashboard/dashboard.html',
    controller: 'adminDashboardCtrl'
  });
}])
.controller('adminDashboardCtrl', ['$scope', '$window', 'adminDashboardService', function($scope, $window, adminDashboardService) {
   var getVouchers  = function() {
   		adminDashboardService.getVouchers();
   }

   $scope.redirectToAddVoucher = function () {
   	return $window.location.href = "#!/add_voucher";  
   };

   /**
   * Todo:
   * Get id for brand
   */
   $scope.redirectToAddBrand = function () {
   	return $window.location.href = "#!/add_brand";  
   };

   /**
   * Todo:
   * Get id for voucher
   */
   $scope.redirectToUpdateVoucher = function () {
    return $window.location.href = "#!/edit_voucher";
   };

}])
.service('adminDashboardService',[ '$http', function ($http){

var adminDashboardService = function ($http) 
{
	this.http_ = $http;
};

adminDashboardService.prototype.getVouchers = function ()
{
	console.log('getting vouchers');
};

}]);
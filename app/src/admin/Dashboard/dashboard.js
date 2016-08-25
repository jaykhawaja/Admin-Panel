/**
* @fileoverview - Includes the logic and voucher service calls for the dashboard
* @author Jay Khawaja
*/
"use strict";

angular.module('myApp.adminDashboard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'app/src/admin/Dashboard/dashboard.html',
    controller: 'adminDashboardCtrl'
  });
}])
.controller('adminDashboardCtrl', ['$scope', '$window', 'adminDashboardService', 'authService', function($scope, $window, adminDashboardService, authService) {
   

   $scope.success = "";
   $scope.error = "";
    // todo: test its
    // add token interceptor
    if (authService.isUserLoggedIn() === false) {
        $window.location.href = "#!/login";
    }
    

  // Stores the vouchers for display
   $scope.voucherList;

   var getVouchers  = function() {
   		
      adminDashboardService.getVouchers()
      .success(function(res, headers, status, config){
        console.log('get vouchers', res);
         if (res.status === true) {
            if (res.data.vouchers.length > 0) {
               $scope.voucherList = res.data.vouchers;
               $('.table').bootstrapTable({
                    data: res.data.vouchers
              }); 
            } else {
               $scope.success = "0 vouchers returned";
            }
         }
      
      })
      .error(function(res, headers, status, config){
         if (res.status === false) {
             $scope.error = "Unable to load vouchers. Please try later!"
         }
      });
   }

   getVouchers();

   $scope.redirectToAddVoucher = function () {
   	 $window.location.href = "#!/add_voucher";  
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
.service('adminDashboardService', [ '$http', '$window', function ($http, $window){

this.getVouchers = function () 
{
	
  return $http.get(GET_VOUCHERS_API_URL, URLheaders);

};

var URLheaders = {

        /**@const */    
        headers: 
        { 
            'Content-Type': 'application/json',
            'token': $window.sessionStorage['token'],
            'source_id': $window.sessionStorage['source_id']
        }
        
     };

var GET_VOUCHERS_API_URL = 'https://book-of-vouchers.herokuapp.com/api/v1/admin/vouchers';


}]);
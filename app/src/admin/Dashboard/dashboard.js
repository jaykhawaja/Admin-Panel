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
.controller('adminDashboardCtrl', [ '$scope', '$location', '$window', '$sessionStorage', '$localStorage','adminDashboardService', 'deleteVoucherService','authService', function( $scope, $location, $window, $sessionStorage, $localStorage ,adminDashboardService, deleteVoucherService, authService) {

   $scope.success = "";
   $scope.error = "";
   $scope.voucherList = ""; // Stores the vouchers for display
     
   if (authService.isUserLoggedIn() === false) {
       $window.location.href = "#!/login";
    };


    
   var getVouchers  = function() {  

      var successGetVouchersResponse = function (res) {
        console.log('res success', res);
        var response = res.data;
        if (response.status === true) {
            if (response.data.vouchers.length > 0) {
                var vouchers = response.data.vouchers;
              
                $scope.voucherList = vouchers;
                $localStorage.vouchers = vouchers;
                $window.localStorage['vouchers'] = vouchers;
               
               $('.table').bootstrapTable({
                    data: response.data.vouchers
              }); 
              
            } else {
               $scope.success = "0 vouchers returned";
            }
         }
      };

      var errorGetVouchersResponse = function (res) {
        var response = res.data;
          if (response.status === false) {
             $scope.error = "Unable to load vouchers. Please try later!";
         }
      };
    
      adminDashboardService.getVouchers()
      .then(successGetVouchersResponse, errorGetVouchersResponse);

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


// BOOTSTRAP TABLE FORMATTER AND EVENTS
// Reference : http://bootstrap-table.wenzhixin.net.cn/documentation/#table-options


  $scope.editFormatter = function() {
    return [
        '<a class="edit btn btn-default btn-sm" >',
        '<span class="glyphicon glyphicon-pencil"></span>',
        '</a>'
    ].join('');
 }

   $scope.deleteFormatter = function() {
    return [
        '<a class="delete btn btn-danger btn-sm" >',
        '<span class="glyphicon glyphicon-trash"></span>',
        '</a>'
    ].join('');
 }




$window.deleteEvent = {
    'click .delete': function (e, value, row) {
        $scope.success = "";
        $scope.error = "";

        var voucherId = row.id;
        var deleteModel = { 
            id : voucherId
        };

      var successDelete = function (res) {
        var response = res.data;
        if (response.status === true) {
           $scope.success = "Vocher has been successfully deleted";
          
           $window.alert($scope.success);
              $('.table').bootstrapTable('remove', {
                field: 'id', 
                values: [voucherId]
              });
          } else {
              $scope.error = response.message;
          }
      }

      var errorDelete = function (res) {
        var response = res.data;
        if(response.status === false) {
            $scope.error = response.message;
        } else {
            $scope.error = "Oops, there seems to be an error removing the voucher. Please try again later!";
        }
      }

      deleteVoucherService.deleteVoucher(deleteModel)
      .then(successDelete, errorDelete)

    }
};

 $window.editEvent = {
    'click .edit': function (e, value, row) {
        console.log('Edit event e',e );
        
        var voucherId = row.id || null;


        console.log('edit id', voucherId);
    
        $sessionStorage.editVoucherId = voucherId;
        $window.location.href = '#!/edit_voucher';
    }
};



// END BOOTSTRAP TABLE CONFIG


}])
.service('adminDashboardService', ['$http', function ( $http){

var GET_VOUCHERS_API_URL, GET_VOUCHERS_CONFIG;

GET_VOUCHERS_API_URL = 'https://book-of-vouchers.herokuapp.com/api/v1/admin/vouchers';

GET_VOUCHERS_CONFIG = {
  cache : true
}


this.getVouchers = function () 
{
  return $http.get(GET_VOUCHERS_API_URL, GET_VOUCHERS_CONFIG );

};



}]);
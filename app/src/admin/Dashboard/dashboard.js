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
.controller('adminDashboardCtrl', [ '$scope', '$window', 'adminDashboardService', 'deleteVoucherService','authService', function( $scope, $window, adminDashboardService, deleteVoucherService, authService) {

    // todo: test its
    // TDODO: add token interceptor
     if (authService.isUserLoggedIn() === false) {
       $window.location.href = "#!/login";
    };

   $scope.success = "";
   $scope.error = "";
    

  // Stores the vouchers for display
   $scope.voucherList = "";

   var getVouchers  = function() {  
    
      adminDashboardService.getVouchers()
      .success(function(res, headers, status, config){

         if (res.status === true) {
            if (res.data.vouchers.length > 0) {
               $scope.voucherList = res.data.vouchers;
               $('.table').bootstrapTable({
                    data: res.data.vouchers
              }); 
               console.log('res vouchers', res.data.vouchers);
            } else {
               $scope.success = "0 vouchers returned";
            }
         }
      
      })
      .error(function(res, headers, status, config){
         if (res.status === false) {
             $scope.error = "Unable to load vouchers. Please try later!";
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


// BOOTSTRAP TABLE FORMATTER AND EVENTS
// Reference : http://bootstrap-table.wenzhixin.net.cn/documentation/#table-options

var elementId = "";
$('.table').on('click-row.bs.table', function(row, $element, field){
  // console.log('table row clicked', row);
  // console.log('table row element', $element);
  console.log('table row element id', $element.id);
  elementId = $element.id;
})

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


 $window.editEvent = {
    'click .edit': function (e, value, row) {
        console.log('Edit events');
      
        console.log('row', row.id);
    }
};

//delete row e.g.
// $table.bootstrapTable('remove', {
   // field: 'name', 
   // ids: [ids]
//     });

 $window.deleteEvent = {
    'click .delete': function (e, value, row) {
        $scope.success = "";
        $scope.error = "";

        console.log('Delete events',e );
        console.log('Delete events', value);
        console.log('Delete events', row);
       
        console.log('row', row.id);
        
        var voucherId = row.id;
        var deleteModel = { 
          data : { 
            "id" : voucherId
          }
        };

        $('.table').bootstrapTable('remove', {
          field: 'id', 
          values: [voucherId]
        });

      deleteVoucherService.deleteVoucher(deleteModel)
      .success(function(res, status, headers, config){
        console.log('res success', res);
        if (res.status === true) {
        $scope.success = "Vocher has been successfully deleted";
          } else {
            $scope.error = res.message;
          }
      })
      .error(function(res, status, headers, config){
        console.log('res error', res);
        if(res.status === false) {
           $scope.error = res.message;
        } else {
           $scope.error = "Oops, there seems to be an error removing the voucher. Please try again later!";
        }
     });
    }
};

 $window.editEvent = {
    'click .edit': function (e, row) {
        console.log('Edit events',e );
        console.log('Edit events', row);
       
        console.log('row', row.id);
        
        var voucherId = row.id;
        var editModel = {
            id : voucherId
        };

        $('.table').bootstrapTable('remove', {
          field: 'id', 
          ids: [voucherId]
        });

     //  deleteVoucherService.delete(deleteModel)
     //  .success(function(res, status, headers, config){
     //    console.log('res success', res);
     //    console.log('voucher succesfully deleted');
     //    //todo remove row id
     //  })
     //  .error(function(res, status, headers, config){
     //    console.log('res success', res);
     //    console.log('there was a problem deleting the voucher');
     // });
    }
};



// END BOOTSTRAP TABLE CONFIG


}])
.service('adminDashboardService', ['$http', '$window', 'authService', function ( $http, $window, authService){

var SESSION_TOKEN, SOURCE_ID, GET_VOUCHERS_API_URL, URL_HEADERS;

GET_VOUCHERS_API_URL = 'https://book-of-vouchers.herokuapp.com/api/v1/admin/vouchers';
SESSION_TOKEN = authService.getToken();
SOURCE_ID = authService.getSourceId();

console.log('SESSION_TOKEN', SESSION_TOKEN);
console.log('SOURCE_ID', SOURCE_ID);

URL_HEADERS = {
  
        headers: 
        { 
            'Content-Type': 'application/json',
            'token': SESSION_TOKEN,
            'source_id':  SOURCE_ID 
        }
        
     };

this.getVouchers = function () 
{
  return $http.get(GET_VOUCHERS_API_URL);

};



}]);
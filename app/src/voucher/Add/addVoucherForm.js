/**
* @fileoverview - Add Voucher
* @author - Jay Khawaja
*/

"use strict";
angular.module('myApp.addVoucher', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/add_voucher', {
    templateUrl: 'src/voucher/Add/addVoucherForm.html',
    controller: 'addVoucherFormCtrl'
  });
}])
.controller('addVoucherFormCtrl', ['$scope', '$window', '$timeout' , 'authService', 'Upload', function($scope, $window, $timeout,  authService, Upload) {
         // if (authService.isUserLoggedIn() === false) {
	     //     $window.location.href = "#!/login";
		 // }

     // TODO GET BRANDS AND INJECT IN DROP DOWN
    	
       $scope.success = "";
       $scope.error = "";

       $scope.VoucherDataModel = {
          voucher : {
              brand: {
                id : "",
                name: "",
                image: ""
            },
               product: {
               name: "",
               image: "",
               description: "",
               location: {
                  coordinates: {
                      longitude: "" ,
                      latitude: ""
                  },
                   address: ""
                 }
               },
         
         id: "",
         featured: false,
         city: 1,
         category: 1,
         expiry: "",
         max_redeems: 100,
         discount: {
            symbol: "%",
            value: 10
           },
          valid: ""
         }
       };

      var VOUCHER_ADD_API_URL = 'https://book-of-vouchers.herokuapp.com/api/v1/admin/add_voucher';

      $scope.submit = function (model, file) {
      
       var VOUCHER_DATA = model;
       // VOUCHER_DATA.file = file;
       VOUCHER_DATA.voucher.product.image = file;
       
            // console.log('submitting form withd model', model);
            // console.log('submiting file with data', file);
            // console.log('voucher data', VOUCHER_DATA);


          file.upload = Upload.upload({
              url:  VOUCHER_ADD_API_URL,
              headers: {
                'token': $window.sessionStorage['token'],
                'source_id': $window.sessionStorage['source_id']
              },
              data: VOUCHER_DATA 
          });         

         file.upload.then(function (response) {
            $timeout(function () {
              file.result = response.data;
              $scope.success = "Voucher Successfully Created"
              $window.location.href="#!/dashboard ";
            });
          }, function (response) {
            if (response.status > 0)
              console.log('error res', response.data);
              $scope.error = response.status + ': Sorry, cannot create voucher at the moment. Please try later';
          }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          }); 
      }


}])

/**
* @fileoverview - Add Voucher
* @author - Jay Khawaja
*/

"use strict";
angular.module('myApp.addVoucher', ['ngRoute'])

.config(['$routeProvider', 'cloudinaryProvider', function($routeProvider, cloudinaryProvider) {
  $routeProvider.when('/add_voucher', {
    templateUrl: 'app/src/voucher/Add/addVoucherForm.html',
    controller: 'addVoucherFormCtrl'
  });

    cloudinaryProvider
      .set("cloud_name", "df5kf6ocq")
      .set("upload_preset", "pocovtmu");

}])
.controller('addVoucherFormCtrl', ['$scope', '$rootScope' ,'$window', '$timeout' , 'authService', 'Upload', 'cloudinary', 'addVoucherService', function($scope, $rootScope, $window, $timeout,  authService, Upload, cloudinary, addVoucherService) {
      //    if (authService.isUserLoggedIn() === false) {
	     //     $window.location.href = "#!/login";
		    // };

     // TODO GET BRANDS AND INJECT IN DROP DOWN
    	
       $scope.success = "";
       $scope.error = "";
       $scope.brands = "";
       $scope.files = "";
       $scope.VoucherDataModel = {
          voucher : {
               brand: "",
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
                 },
               },
         
         valid: "",
         expiry: "",
         featured: false,
         max_redeems: 100,
         city: 1,
         category: 1,
         discount: {
            value: 10,
            symbol: "%"
           },
          image: {
            id: "",
            url: ""
          }
         }
       };

      var IMAGE_ADD_API_URL = "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload";
      var d = new Date();
      $scope.title = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";
      
      $scope.uploadFile = function (files) {
       
        console.log('file submitted', files);
        $scope.files = files;
        if (!$scope.files) return;

        angular.forEach($scope.files, function(file){
           if (file && !file.$error) {  
            console.log('Uploading scope title', $scope.title);
            console.log('uploading  file', file);
            
             var CLOUDINARY_DATA = {
              upload_preset: cloudinary.config().upload_preset,
              tags: 'myphotoalbum',
              context: 'photo=' + $scope.title,
              file: file
            };

            console.log('submiting file with data', file);
            console.log('cloudinary data', CLOUDINARY_DATA);

              file.upload = Upload.upload({
                  url:  IMAGE_ADD_API_URL,
                  data: CLOUDINARY_DATA
              });         

             file.upload.then(function (response) {
                $timeout(function () {  
                  file.result = response.data;
                  console.log('response.data', response.data);
                  $scope.VoucherDataModel.voucher.image.id = response.data.public_id;
                  $scope.VoucherDataModel.voucher.image.url = response.data.secure_url;
                });
              }, function (response) {
                if (response.status > 0)
                  console.log('error res', response.data);
                  $scope.error = response.status + ': Sorry, cannot upload image at the moment. Please try later';
              }, function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                file.status = "Uploading... " + file.progress + "%";
              }); 
           }
        })
      }

     
      $scope.submit = function (model) {
        console.log('submitted model', model);
        if (angular.isObject(model)) {
           addVoucherService.addVoucher()
           .success(function(res, headers, status, config){
              console.log('success res', res);
              if (res.status === true) {
                  $scope.success = "Voucher has been successfully added!";
              };
           })
           .error(function(res, headers, status, config){
              console.log('error res', res);
              $scope.error = "Sorry, cannot upload voucher at the moment. Please inform your web amin";
           })
        }
      }

      //get brands to add to the brand selection
      addVoucherService.getBrands()
      .success(function(res, headers, status, config) {
         console.log('brands res is', res);
         if (res.status === true){
             if (res.data.brands.length > 0) {
                $scope.brands = res.data.brands;
             } else {
              // TODO: show No brands avaiable in the drop down
             }
         } else {
            $scope.error = "Sorry cannot reach the server at the moment";
          } 
      })
      .error(function(res, headers, status, config){
        console.log('brands err res is', res);
      });


}])
.service('addVoucherService', ['$http', '$window', function($http, $window) {
  
  this.addVoucher = function(model) {
    return $http.put(ADD_VOUCHER_URL, model, ADD_VOUCHER_URL_URLheaders );
  }
  var ADD_VOUCHER_URL = "https://book-of-vouchers.herokuapp.com/api/v1/admin/add_voucher";
  var ADD_VOUCHER_URL_URLheaders = {

        /**@const */    
        headers: 
        { 
            'Content-Type': "application/json",
            'token': $window.sessionStorage['token'],
            'source_id': $window.sessionStorage['source_id']
        }
        
     };

  this.getBrands = function () {
    return $http.get(GET_BRANDS_URL, GET_BRANDS_URLheaders);
  };

  var GET_BRANDS_URLheaders = {

        /**@const */    
        headers: 
        { 
            'token': $window.sessionStorage['token'],
            'source_id': $window.sessionStorage['source_id']
        }
        
     };

  var GET_BRANDS_URL = 'https://book-of-vouchers.herokuapp.com/api/v1/admin/brands';
}])

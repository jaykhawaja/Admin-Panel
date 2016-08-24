'use strict';

angular.module('myApp.addBrand', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/add_brand', {
    templateUrl: 'src/brand/Add/addBrandForm.html',
    controller: 'addBrandFormCtrl'
  });
}])
.controller('addBrandFormCtrl', ['$scope','$window', '$timeout', 'authService', 'addBrandService', 'Upload', function($scope, $window, $timeout, authService ,addBrandService, Upload) {
    
   if (authService.isUserLoggedIn() === false) {
           $window.location.href = "#!/login";
   };

  	$scope.success = "";
    $scope.error = "";

	$scope.brandModel = {
		brand: {
			image: "",
			name : ""
		}
	};

	var BRAND_ADD_API_URL = 'https://book-of-vouchers.herokuapp.com/api/v1/admin/add_brand';

	$scope.create = function (model, file) {
		
		var BRAND_DATA = model;
        BRAND_DATA.brand.image = file;
       

          file.upload = Upload.upload({
              url:  BRAND_ADD_API_URL,
              headers: {
                'token': $window.sessionStorage['token'],
                'source_id': $window.sessionStorage['source_id']
              },
              data: BRAND_DATA 
          });         

         file.upload.then(function (response) {
            $timeout(function () {
              file.result = response.data;
              $scope.success = "Brand Successfully Created"
              $window.location.href="#!/dashboard ";
            });
          }, function (response) {
            if (response.status > 0)
              console.log('error res', response.data);
              $scope.error = response.status + ': Sorry, cannot create  brand at the moment. Please try later';
          }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          }); 
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
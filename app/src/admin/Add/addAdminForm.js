/**
* @fileoverview - Add Admin
* @author - Jay Khawaja
*/
"use strict";

angular.module('myApp.adminAdd', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/add_admin', {
    templateUrl: 'src/admin/Add/addAdminForm.html',
    controller: 'adminAddCtrl'
  });
}])
.controller('adminAddCtrl', ['$scope','adminAddService', 'authService', function($scope, adminAddService, authService) {
  	
    // if (authService.isUserLoggedIn() === false) {
    //     $window.location.href = "#!/login";
    // }

    $scope.success = "";
    $scope.error = "";

    $scope.adminAddModel = {
          email : "",
          password :""
    }

  	$scope.add = function(model) {
      console.log('add model', model);
      if (angular.isObject(model)) {
  		  adminAddService.add(model)
        .success(function(res, headers, status, config) {
            console.log('success res', res);
            if (res.status == true) {
               $scope.success = "Admin Successfully added";
            }
        })
        .error(function(res, headers, status, config) {
          console.log('error res', res);
          if (res.status == false) {
            $scope.error = "There seems to be problem. Please try again later";
          } 
        })
      }

  	}
}])
.service('adminAddService', ['$http' ,'$window', function($http, $window){

this.add = function (model) 
{
      return $http.post(ADMIN_ADD_API_URL, model, URLheaders)
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

  var ADMIN_ADD_API_URL = 'https://book-of-vouchers.herokuapp.com/api/v1/sign_up/admin';

}]);
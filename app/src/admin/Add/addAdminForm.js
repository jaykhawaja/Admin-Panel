'use strict';

angular.module('myApp.adminAdd', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/add_admin', {
    templateUrl: 'src/admin/Add/addAdminForm.html',
    controller: 'adminAddCtrl'
  });
}])
.controller('adminAddCtrl', ['$scope','adminAddService', 'authService'. , function($scope, adminAddService, authService) {
  	
    // if (authService.isUserLoggedIn() === false) {
    //     $window.location.href = "#!/login";
    // }

  	$scope.add = function() {
  		console.log('login received');
  		adminAddservice.add();

  	}
}])
.service('adminAddService', ['$http', function($http){

this.adminAddService = function () 
{
  console.log('admin service');
};


}]);
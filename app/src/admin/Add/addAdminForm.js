'use strict';

angular.module('myApp.adminAdd', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/add_admin', {
    templateUrl: 'src/admin/Add/addAdminForm.html',
    controller: 'adminAddCtrl'
  });
}])

.controller('adminAddCtrl', [function() {

}]);
'use strict';

angular.module('myApp.editBrand', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/edit_brand', {
    templateUrl: 'src/brand/Edit/editBrandForm.html',
    controller: 'editBrandFormCtrl'
  });
}])

.controller('editBrandFormCtrl', [function() {

}]);
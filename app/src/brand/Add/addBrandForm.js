'use strict';

angular.module('myApp.addBrand', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/add_brand', {
    templateUrl: 'src/brand/Add/addBrandForm.html',
    controller: 'addBrandFormCtrl'
  });
}])

.controller('addBrandFormCtrl', [function() {

}]);
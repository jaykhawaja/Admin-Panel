'use strict';

angular.module('myApp.addVoucher', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/add_voucher', {
    templateUrl: 'src/voucher/Add/addVoucherForm.html',
    controller: 'addVoucherFormCtrl'
  });
}])

.controller('addVoucherFormCtrl', [function() {

}]);
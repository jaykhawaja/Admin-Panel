'use strict';

angular.module('myApp.editVoucher', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/edit_voucher', {
    templateUrl: 'src/voucher/Edit/editVoucherForm.html',
    controller: 'editVoucherFormCtrl'
  });
}])

.controller('editVoucherFormCtrl', [function() {

}]);
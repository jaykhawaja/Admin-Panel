'use strict';

describe('myApp.adminDashboard module', function() {

  beforeEach(module('myApp.adminAdd'));

  describe('adminAddcontroller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var adminAddCtrl = $controller('adminAddCtrl');
      expect(adminAddCtrl).toBeDefined();
    }));

  });
});
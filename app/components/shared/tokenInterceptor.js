'use strict';
//TODO: NOT INTEGRATED / IMPLEMENTED
angular.module('myApp.tokenInterceptor', [])
.factory('myHttpInterceptor', ['$q', 'authService', function($q, authService) {
  return {
    // optional method
    'request': function(config) {
    	console.log('inside interceptor req', config);
    	var token = authService.getToken();
    	var source_id = authService.getSourceId();

    	config.headers = config.headers || {};
    	config.headers['Accept'] = undefined;

    	var imageUploadURL = 'https://api.cloudinary.com/v1_1/df5kf6ocq/upload';
    	
    	if (token) {
    		config.headers['token'] = token;	
    		config.headers['source_id'] = source_id;	
    		// config.headers['Content-Type'] = 'application/json';	
    	}


    	// to clean headers for image upload
    	if (config.url === imageUploadURL)
    	{
    		config.headers['token'] = undefined;	
    		config.headers['source_id'] = undefined;	
    	}
      // do something on success
      return config;
    },

    // optional method
   'requestError': function(rejection) {
   	console.log('inside interceptor requestError', rejection);
      // do something on error
      // if (canRecover(rejection)) {
      //   return responseOrNewPromise
      // }
      return $q.reject(rejection);
    },



    // optional method
    'response': function(response) {
    	console.log('inside interceptor res', response);
      // do something on success
      return response;
    },

    // optional method
   'responseError': function(rejection) {
    	console.log('inside responseError', rejection);
      // do something on error
      // if (canRecover(rejection)) {
      //   return responseOrNewPromise
      // }
      return $q.reject(rejection);
    }
  };
}]);

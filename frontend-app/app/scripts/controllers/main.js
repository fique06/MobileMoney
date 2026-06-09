'use strict';

angular.module('mobileMoneyApp')
  .controller('mainCtrl', ['$rootScope', '$scope', '$http', 'authFactory', 'dataFactory',
	function ($rootScope, $scope, $http, authFactory, dataFactory) {
		
      $scope.loading = true;
	//   console.log("AUTH CALL STARTING");
	//   console.log("LOGIN ROOTSCOPE:", $rootScope.username, $rootScope.password);
	//   authFactory.getAuthKey("mifos", "Mynameis1*M")
	authFactory.getAuthKey($rootScope.username, $rootScope.password)
	  		.then(function(response){
				var basicKey = response.data.base64EncodedAuthenticationKey;
				authFactory.setBasicAuthKey(basicKey);
				
				// get all the clients
				dataFactory.getAllClients()
					.then(function(response){
						$scope.clients = response.data.pageItems;
						$scope.totalClients = response.data.totalFilteredRecords;
						$scope.loading = false
					}, function(error){});
	  		}, function(error){});
  }]);

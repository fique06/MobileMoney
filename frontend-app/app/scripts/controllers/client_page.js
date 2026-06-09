'use strict';

angular.module('mobileMoneyApp')
  .controller('clientCtrl', ['$rootScope', '$scope', '$http', '$timeout', '$stateParams', 'authFactory', 'dataFactory',
  	function ($rootScope, $scope, $http, $timeout, $stateParams, authFactory, dataFactory) {
  	
	$scope.clientId = $stateParams.id;
  	$scope.loading = true;
	
	// authenticate user
	// console.log("CLIENT ROOTSCOPE:", $rootScope.username, $rootScope.password);
	authFactory.getAuthKey($rootScope.username, $rootScope.password)
	// authFactory.getAuthKey("mifos", "Mynameis1*M")
    	.then(function (response) {
			// console.log("AUTH RESPONSE:", response.data);
			var basicKey = response.data.base64EncodedAuthenticationKey;
			authFactory.setBasicAuthKey(basicKey);
	
			// get client data
			dataFactory.getClientDetails($scope.clientId)
				.then(function(response){
    				$scope.data = response.data;
    				$scope.accountNo = $scope.data.accountNo;
    				$scope.clientName = $scope.data.displayName;
    				$scope.staffName = $scope.data.staffName;
	          		$scope.activDate = new Date($scope.data.activationDate);
					$scope.activationDate = $scope.activDate.toDateString();
    				$scope.officeName = $scope.data.officeName;
    				$scope.userName = $scope.data.timeline.activatedByUsername;
    				$scope.loading = false;
				}, function(error){
					console.log("CLIENT ERROR:", error);
				});
    	}, function (error){
			console.log("AUTH ERROR:", error);
		});
	
    	$rootScope.goBack = function(){
    		window.history.back();
    	};
  }]);

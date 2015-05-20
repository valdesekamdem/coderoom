
angular.module('coderoom').controller('NewUserController', function ($scope, $location, locationParser
		, UserResource, LoginResource, SessionService) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.user = $scope.user || {};
    
    $scope.userTypeList = [
        "TEACHER",
        "STUDENT"
    ];
    
    
    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Users/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        UserResource.save($scope.user, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/");
    };
    
    $scope.connexion = function () {
    	LoginResource.login($scope.user)
    	.success(function (data) {
    		console.log(data);
    		SessionService.setUser(data);
			$location.path("/");
		})
		.error(function (error) {
			
		})
	}
    
    $scope.xx = $scope.connexion();
});
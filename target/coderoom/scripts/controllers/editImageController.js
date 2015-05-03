

angular.module('coderoom').controller('EditImageController', function($scope, $routeParams, $location, ImageResource ) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.image = new ImageResource(self.original);
        };
        var errorCallback = function() {
            $location.path("/Images");
        };
        ImageResource.get({ImageId:$routeParams.ImageId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.image);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.image.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Images");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Images");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.image.$remove(successCallback, errorCallback);
    };
    
    $scope.userTypeList = [
        "TEACHER",  
        "STUDENT"  
    ];
    
    $scope.get();
});
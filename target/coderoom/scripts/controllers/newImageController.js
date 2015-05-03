
angular.module('coderoom').controller('NewImageController', function ($scope, $location, locationParser, ImageResource ) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.image = $scope.image || {};
    
    $scope.userTypeList = [
        "TEACHER",
        "STUDENT"
    ];
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Images/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        ImageResource.save($scope.image, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Images");
    };
});
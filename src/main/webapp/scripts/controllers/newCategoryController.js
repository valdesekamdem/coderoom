
angular.module('coderoom').controller('NewCategoryController', function ($scope, $location, locationParser, CategoryResource ) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.category = $scope.category || {};
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Categories/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        CategoryResource.save($scope.category, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Categories");
    };
});
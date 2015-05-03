

angular.module('coderoom').controller('EditCategoryController', function($scope, $routeParams, $location, CategoryResource ) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.category = new CategoryResource(self.original);
        };
        var errorCallback = function() {
            $location.path("/Categories");
        };
        CategoryResource.get({CategoryId:$routeParams.CategoryId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.category);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.category.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Categories");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Categories");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.category.$remove(successCallback, errorCallback);
    };
    
    
    $scope.get();
});
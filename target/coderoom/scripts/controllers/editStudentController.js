

angular.module('coderoom').controller('EditStudentController', function($scope, $routeParams, $location, StudentResource , ImageResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.student = new StudentResource(self.original);
            ImageResource.queryAll(function(items) {
                $scope.imageSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.student.image && item.id == $scope.student.image.id) {
                        $scope.imageSelection = labelObject;
                        $scope.student.image = wrappedObject;
                        self.original.image = $scope.student.image;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/Students");
        };
        StudentResource.get({StudentId:$routeParams.StudentId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.student);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.student.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Students");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Students");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.student.$remove(successCallback, errorCallback);
    };
    
    $scope.languageList = [
        "FRENCH",  
        "ENGLISH"  
    ];
    $scope.$watch("imageSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.student.image = {};
            $scope.student.image.id = selection.value;
        }
    });
    $scope.ableList = [
        "true",
        "false"
    ];
    $scope.deletedList = [
        "true",
        "false"
    ];
    
    $scope.get();
});
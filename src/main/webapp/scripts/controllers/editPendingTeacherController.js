

angular.module('coderoom').controller('EditPendingTeacherController', function($scope, $routeParams, $location, PendingTeacherResource , ImageResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.pendingTeacher = new PendingTeacherResource(self.original);
            ImageResource.queryAll(function(items) {
                $scope.imageSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.pendingTeacher.image && item.id == $scope.pendingTeacher.image.id) {
                        $scope.imageSelection = labelObject;
                        $scope.pendingTeacher.image = wrappedObject;
                        self.original.image = $scope.pendingTeacher.image;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/PendingTeachers");
        };
        PendingTeacherResource.get({PendingTeacherId:$routeParams.PendingTeacherId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.pendingTeacher);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.pendingTeacher.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/PendingTeachers");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/PendingTeachers");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.pendingTeacher.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("imageSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.pendingTeacher.image = {};
            $scope.pendingTeacher.image.id = selection.value;
        }
    });
    $scope.languageList = [
        "FRENCH",  
        "ENGLISH"  
    ];
    $scope.ableList = [
        "true",
        "false"
    ];
    
    $scope.get();
});
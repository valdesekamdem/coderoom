

angular.module('coderoom').controller('EditPendingExerciseController', function($scope, $routeParams, $location, PendingExerciseResource , CourseResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.pendingExercise = new PendingExerciseResource(self.original);
            CourseResource.queryAll(function(items) {
                $scope.courseSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.pendingExercise.course && item.id == $scope.pendingExercise.course.id) {
                        $scope.courseSelection = labelObject;
                        $scope.pendingExercise.course = wrappedObject;
                        self.original.course = $scope.pendingExercise.course;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/PendingExercises");
        };
        PendingExerciseResource.get({PendingExerciseId:$routeParams.PendingExerciseId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.pendingExercise);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.pendingExercise.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/PendingExercises");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/PendingExercises");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.pendingExercise.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("courseSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.pendingExercise.course = {};
            $scope.pendingExercise.course.id = selection.value;
        }
    });
    
    $scope.get();
});
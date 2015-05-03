

angular.module('coderoom').controller('EditExerciseController', function($scope, $routeParams, $location, ExerciseResource , CourseResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.exercise = new ExerciseResource(self.original);
            CourseResource.queryAll(function(items) {
                $scope.courseSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.exercise.course && item.id == $scope.exercise.course.id) {
                        $scope.courseSelection = labelObject;
                        $scope.exercise.course = wrappedObject;
                        self.original.course = $scope.exercise.course;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/Exercises");
        };
        ExerciseResource.get({ExerciseId:$routeParams.ExerciseId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.exercise);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.exercise.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Exercises");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Exercises");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.exercise.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("courseSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.exercise.course = {};
            $scope.exercise.course.id = selection.value;
        }
    });
    
    $scope.get();
});
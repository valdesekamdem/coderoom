
angular.module('coderoom').controller('NewExerciseController', function ($scope, $location, locationParser, ExerciseResource , CourseResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.exercise = $scope.exercise || {};
    
    $scope.courseList = CourseResource.queryAll(function(items){
        $scope.courseSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("courseSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.exercise.course = {};
            $scope.exercise.course.id = selection.value;
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Exercises/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        ExerciseResource.save($scope.exercise, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Exercises");
    };
});

angular.module('coderoom').controller('NewPendingExerciseController', function ($scope, $location, locationParser, PendingExerciseResource , CourseResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.pendingExercise = $scope.pendingExercise || {};
    
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
            $scope.pendingExercise.course = {};
            $scope.pendingExercise.course.id = selection.value;
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/PendingExercises/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        PendingExerciseResource.save($scope.pendingExercise, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/PendingExercises");
    };
});
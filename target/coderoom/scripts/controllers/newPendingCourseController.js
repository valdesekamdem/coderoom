
angular.module('coderoom').controller('NewPendingCourseController', function ($scope, $location, locationParser, PendingCourseResource , TeacherResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.pendingCourse = $scope.pendingCourse || {};
    
    $scope.teacherList = TeacherResource.queryAll(function(items){
        $scope.teacherSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("teacherSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.pendingCourse.teacher = {};
            $scope.pendingCourse.teacher.id = selection.value;
        }
    });
    
    $scope.popularList = [
        "true",
        "false"
    ];


    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/PendingCourses/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        PendingCourseResource.save($scope.pendingCourse, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/PendingCourses");
    };
});
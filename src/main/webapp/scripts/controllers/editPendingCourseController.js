

angular.module('coderoom').controller('EditPendingCourseController', function($scope, $routeParams, $location, PendingCourseResource , TeacherResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.pendingCourse = new PendingCourseResource(self.original);
            TeacherResource.queryAll(function(items) {
                $scope.teacherSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.pendingCourse.teacher && item.id == $scope.pendingCourse.teacher.id) {
                        $scope.teacherSelection = labelObject;
                        $scope.pendingCourse.teacher = wrappedObject;
                        self.original.teacher = $scope.pendingCourse.teacher;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/PendingCourses");
        };
        PendingCourseResource.get({PendingCourseId:$routeParams.PendingCourseId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.pendingCourse);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.pendingCourse.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/PendingCourses");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/PendingCourses");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.pendingCourse.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("teacherSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.pendingCourse.teacher = {};
            $scope.pendingCourse.teacher.id = selection.value;
        }
    });
    $scope.popularList = [
        "true",
        "false"
    ];
    
    $scope.get();
});
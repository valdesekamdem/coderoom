
angular.module('coderoom').controller('NewCourseController', function ($scope, $location, locationParser, CourseResource , TeacherResource, CategoryResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.course = $scope.course || {};
    
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
            $scope.course.teacher = {};
            $scope.course.teacher.id = selection.value;
        }
    });
    
    $scope.categoriesList = CategoryResource.queryAll(function(items){
        $scope.categoriesSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("categoriesSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.course.categories = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.course.categories.push(collectionItem);
            });
        }
    });

    $scope.popularList = [
        "true",
        "false"
    ];


    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Courses/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        CourseResource.save($scope.course, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Courses");
    };
});
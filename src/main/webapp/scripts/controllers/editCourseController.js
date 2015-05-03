

angular.module('coderoom').controller('EditCourseController', function($scope, $routeParams, $location, CourseResource , TeacherResource, CategoryResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.course = new CourseResource(self.original);
            TeacherResource.queryAll(function(items) {
                $scope.teacherSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.course.teacher && item.id == $scope.course.teacher.id) {
                        $scope.teacherSelection = labelObject;
                        $scope.course.teacher = wrappedObject;
                        self.original.teacher = $scope.course.teacher;
                    }
                    return labelObject;
                });
            });
            CategoryResource.queryAll(function(items) {
                $scope.categoriesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.course.categories){
                        $.each($scope.course.categories, function(idx, element) {
                            if(item.id == element.id) {
                                $scope.categoriesSelection.push(labelObject);
                                $scope.course.categories.push(wrappedObject);
                            }
                        });
                        self.original.categories = $scope.course.categories;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/Courses");
        };
        CourseResource.get({CourseId:$routeParams.CourseId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.course);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.course.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Courses");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Courses");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.course.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("teacherSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.course.teacher = {};
            $scope.course.teacher.id = selection.value;
        }
    });
    $scope.categoriesSelection = $scope.categoriesSelection || [];
    $scope.$watch("categoriesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.course) {
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
    
    $scope.get();
});
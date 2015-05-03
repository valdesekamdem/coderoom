

angular.module('coderoom').controller('EditSessionController', function($scope, $routeParams, $location, SessionResource , CourseResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.session = new SessionResource(self.original);
            CourseResource.queryAll(function(items) {
                $scope.courseSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.session.course && item.id == $scope.session.course.id) {
                        $scope.courseSelection = labelObject;
                        $scope.session.course = wrappedObject;
                        self.original.course = $scope.session.course;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/Sessions");
        };
        SessionResource.get({SessionId:$routeParams.SessionId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.session);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.session.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Sessions");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Sessions");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.session.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("courseSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.session.course = {};
            $scope.session.course.id = selection.value;
        }
    });
    
    $scope.get();
});
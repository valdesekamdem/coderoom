
angular.module('coderoom').controller('NewSessionController', function ($scope, $location, locationParser, SessionResource , CourseResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.session = $scope.session || {};
    
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
            $scope.session.course = {};
            $scope.session.course.id = selection.value;
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Sessions/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        SessionResource.save($scope.session, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Sessions");
    };
});
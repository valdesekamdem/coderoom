
angular.module('coderoom').controller('NewPendingTeacherController', function ($scope, $location, locationParser, PendingTeacherResource , ImageResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.pendingTeacher = $scope.pendingTeacher || {};
    
    $scope.imageList = ImageResource.queryAll(function(items){
        $scope.imageSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("imageSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.pendingTeacher.image = {};
            $scope.pendingTeacher.image.id = selection.value;
        }
    });
    
    $scope.languageList = [
        "FRENCH",
        "ENGLISH"
    ];
    
    $scope.ableList = [
        "true",
        "false"
    ];


    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/PendingTeachers/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        PendingTeacherResource.save($scope.pendingTeacher, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/PendingTeachers");
    };
});
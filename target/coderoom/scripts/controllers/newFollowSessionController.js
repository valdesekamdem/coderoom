
angular.module('coderoom').controller('NewFollowSessionController', function ($scope, $location, locationParser, FollowSessionResource , SessionResource, StudentResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.followSession = $scope.followSession || {};
    
    $scope.sessionList = SessionResource.queryAll(function(items){
        $scope.sessionSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("sessionSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.followSession.session = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.followSession.session.push(collectionItem);
            });
        }
    });

    $scope.studentList = StudentResource.queryAll(function(items){
        $scope.studentSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("studentSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.followSession.student = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.followSession.student.push(collectionItem);
            });
        }
    });


    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/FollowSessions/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        FollowSessionResource.save($scope.followSession, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/FollowSessions");
    };
});
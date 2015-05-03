
angular.module('coderoom').controller('NewTaskController', function ($scope, $location, locationParser, TaskResource , FollowSessionResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.task = $scope.task || {};
    
    $scope.followSessionList = FollowSessionResource.queryAll(function(items){
        $scope.followSessionSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("followSessionSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.task.followSession = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.task.followSession.push(collectionItem);
            });
        }
    });


    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Tasks/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        TaskResource.save($scope.task, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Tasks");
    };
});
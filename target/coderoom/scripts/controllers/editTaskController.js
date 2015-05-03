

angular.module('coderoom').controller('EditTaskController', function($scope, $routeParams, $location, TaskResource , FollowSessionResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.task = new TaskResource(self.original);
            FollowSessionResource.queryAll(function(items) {
                $scope.followSessionSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.task.followSession){
                        $.each($scope.task.followSession, function(idx, element) {
                            if(item.id == element.id) {
                                $scope.followSessionSelection.push(labelObject);
                                $scope.task.followSession.push(wrappedObject);
                            }
                        });
                        self.original.followSession = $scope.task.followSession;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/Tasks");
        };
        TaskResource.get({TaskId:$routeParams.TaskId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.task);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.task.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Tasks");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Tasks");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.task.$remove(successCallback, errorCallback);
    };
    
    $scope.followSessionSelection = $scope.followSessionSelection || [];
    $scope.$watch("followSessionSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.task) {
            $scope.task.followSession = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.task.followSession.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});
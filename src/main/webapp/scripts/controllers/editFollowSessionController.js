

angular.module('coderoom').controller('EditFollowSessionController', function($scope, $routeParams, $location, FollowSessionResource , SessionResource, StudentResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.followSession = new FollowSessionResource(self.original);
            SessionResource.queryAll(function(items) {
                $scope.sessionSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.followSession.session){
                        $.each($scope.followSession.session, function(idx, element) {
                            if(item.id == element.id) {
                                $scope.sessionSelection.push(labelObject);
                                $scope.followSession.session.push(wrappedObject);
                            }
                        });
                        self.original.session = $scope.followSession.session;
                    }
                    return labelObject;
                });
            });
            StudentResource.queryAll(function(items) {
                $scope.studentSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.followSession.student){
                        $.each($scope.followSession.student, function(idx, element) {
                            if(item.id == element.id) {
                                $scope.studentSelection.push(labelObject);
                                $scope.followSession.student.push(wrappedObject);
                            }
                        });
                        self.original.student = $scope.followSession.student;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/FollowSessions");
        };
        FollowSessionResource.get({FollowSessionId:$routeParams.FollowSessionId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.followSession);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.followSession.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/FollowSessions");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/FollowSessions");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.followSession.$remove(successCallback, errorCallback);
    };
    
    $scope.sessionSelection = $scope.sessionSelection || [];
    $scope.$watch("sessionSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.followSession) {
            $scope.followSession.session = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.followSession.session.push(collectionItem);
            });
        }
    });
    $scope.studentSelection = $scope.studentSelection || [];
    $scope.$watch("studentSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.followSession) {
            $scope.followSession.student = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.followSession.student.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});
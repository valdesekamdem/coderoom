

angular.module('coderoom').controller('EditTeacherController', function($scope, $routeParams, $location, TeacherResource , ImageResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.teacher = new TeacherResource(self.original);
            ImageResource.queryAll(function(items) {
                $scope.imageSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.teacher.image && item.id == $scope.teacher.image.id) {
                        $scope.imageSelection = labelObject;
                        $scope.teacher.image = wrappedObject;
                        self.original.image = $scope.teacher.image;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/Teachers");
        };
        TeacherResource.get({TeacherId:$routeParams.TeacherId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.teacher);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.teacher.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Teachers");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Teachers");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.teacher.$remove(successCallback, errorCallback);
    };
    
    $scope.languageList = [
        "FRENCH",  
        "ENGLISH"  
    ];
    $scope.$watch("imageSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.teacher.image = {};
            $scope.teacher.image.id = selection.value;
        }
    });
    $scope.ableList = [
        "true",
        "false"
    ];
    $scope.deletedList = [
        "true",
        "false"
    ];
    
    $scope.get();
});
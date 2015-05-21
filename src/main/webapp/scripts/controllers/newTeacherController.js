
angular.module('coderoom').controller('NewTeacherController', function ($scope, $location, locationParser, TeacherResource , ImageResource, TeacherAccountResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.teacher = $scope.teacher || {};
    
    $scope.languageList = [
        "FRENCH",
        "ENGLISH"
    ];
    
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
    
    $scope.teacherAccount = {};

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Teachers/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        TeacherResource.save($scope.teacher, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Teachers");
    };
    
    $scope.create = function() {
    	TeacherAccountResource.save($scope.teacherAccount).success(function(){
			$location.path("/");
		}).error(function(){
			$scope.displayError = true;
		});
		$scope.compte = {};
    };
});
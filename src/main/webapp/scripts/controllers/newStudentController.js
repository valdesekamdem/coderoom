
angular.module('coderoom').controller('NewStudentController', function ($scope, $location, locationParser, StudentResource , ImageResource , CompteResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.student = $scope.student || {};
    
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
            $scope.student.image = {};
            $scope.student.image.id = selection.value;
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
    
    $scope.compte = {};


    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Students/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        StudentResource.save($scope.student, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/");
    };
    
//    $scope.create = function () {
//    	var successCallback = function(data,responseHeaders){
//    		$location.path("/");
//    	};
//    	var errorCallback = function(){
//    		$scope.displayError = true;
//    	};
//		CompteResource.save($scope.compte, successCallback, errorCallback);
//    }
    $scope.create = function () {
		CompteResource.save($scope.compte).success(function(){
			$location.path("/");
		}).error(function(){
			$scope.displayError = true;
		});
		$scope.compte = {};
    }
});
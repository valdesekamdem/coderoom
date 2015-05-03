
angular.module('coderoom').controller('NewStudentController', function ($scope, $location, locationParser, StudentResource ) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.student = $scope.student || {};
    
    $scope.languageList = [
        "FRENCH",
        "ENGLISH"
    ];
    
    $scope.ableList = [
        "true",
        "false"
    ];

    $scope.deletedList = [
        "true",
        "false"
    ];


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
        $location.path("/Students");
    };
});
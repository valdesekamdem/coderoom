'use strict';

angular.module('coderoom',['ngRoute','ngResource'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/',{templateUrl:'views/landing.html',controller:'LandingPageController'})
      .when('/Categories',{templateUrl:'views/Category/search.html',controller:'SearchCategoryController'})
      .when('/Categories/new',{templateUrl:'views/Category/detail.html',controller:'NewCategoryController'})
      .when('/Categories/edit/:CategoryId',{templateUrl:'views/Category/detail.html',controller:'EditCategoryController'})
      .when('/Courses',{templateUrl:'views/Course/search.html',controller:'SearchCourseController'})
      .when('/Courses/new',{templateUrl:'views/Course/detail.html',controller:'NewCourseController'})
      .when('/Courses/edit/:CourseId',{templateUrl:'views/Course/detail.html',controller:'EditCourseController'})
      .when('/Exercises',{templateUrl:'views/Exercise/search.html',controller:'SearchExerciseController'})
      .when('/Exercises/new',{templateUrl:'views/Exercise/detail.html',controller:'NewExerciseController'})
      .when('/Exercises/edit/:ExerciseId',{templateUrl:'views/Exercise/detail.html',controller:'EditExerciseController'})
      .when('/FollowSessions',{templateUrl:'views/FollowSession/search.html',controller:'SearchFollowSessionController'})
      .when('/FollowSessions/new',{templateUrl:'views/FollowSession/detail.html',controller:'NewFollowSessionController'})
      .when('/FollowSessions/edit/:FollowSessionId',{templateUrl:'views/FollowSession/detail.html',controller:'EditFollowSessionController'})
      .when('/Images',{templateUrl:'views/Image/search.html',controller:'SearchImageController'})
      .when('/Images/new',{templateUrl:'views/Image/detail.html',controller:'NewImageController'})
      .when('/Images/edit/:ImageId',{templateUrl:'views/Image/detail.html',controller:'EditImageController'})
      .when('/PendingCourses',{templateUrl:'views/PendingCourse/search.html',controller:'SearchPendingCourseController'})
      .when('/PendingCourses/new',{templateUrl:'views/PendingCourse/detail.html',controller:'NewPendingCourseController'})
      .when('/PendingCourses/edit/:PendingCourseId',{templateUrl:'views/PendingCourse/detail.html',controller:'EditPendingCourseController'})
      .when('/PendingExercises',{templateUrl:'views/PendingExercise/search.html',controller:'SearchPendingExerciseController'})
      .when('/PendingExercises/new',{templateUrl:'views/PendingExercise/detail.html',controller:'NewPendingExerciseController'})
      .when('/PendingExercises/edit/:PendingExerciseId',{templateUrl:'views/PendingExercise/detail.html',controller:'EditPendingExerciseController'})
      .when('/PendingTeachers',{templateUrl:'views/PendingTeacher/search.html',controller:'SearchPendingTeacherController'})
      .when('/PendingTeachers/new',{templateUrl:'views/PendingTeacher/detail.html',controller:'NewPendingTeacherController'})
      .when('/PendingTeachers/edit/:PendingTeacherId',{templateUrl:'views/PendingTeacher/detail.html',controller:'EditPendingTeacherController'})
      .when('/Sessions',{templateUrl:'views/Session/search.html',controller:'SearchSessionController'})
      .when('/Sessions/new',{templateUrl:'views/Session/detail.html',controller:'NewSessionController'})
      .when('/Sessions/edit/:SessionId',{templateUrl:'views/Session/detail.html',controller:'EditSessionController'})
      .when('/Students',{templateUrl:'views/Student/search.html',controller:'SearchStudentController'})
      .when('/Students/new',{templateUrl:'views/Student/detail.html',controller:'NewStudentController'})
      .when('/Students/edit/:StudentId',{templateUrl:'views/Student/detail.html',controller:'EditStudentController'})
      .when('/Tasks',{templateUrl:'views/Task/search.html',controller:'SearchTaskController'})
      .when('/Tasks/new',{templateUrl:'views/Task/detail.html',controller:'NewTaskController'})
      .when('/Tasks/edit/:TaskId',{templateUrl:'views/Task/detail.html',controller:'EditTaskController'})
      .when('/Teachers',{templateUrl:'views/Teacher/search.html',controller:'SearchTeacherController'})
      .when('/Teachers/new',{templateUrl:'views/Teacher/detail.html',controller:'NewTeacherController'})
      .when('/Teachers/edit/:TeacherId',{templateUrl:'views/Teacher/detail.html',controller:'EditTeacherController'})
      .when('/Users',{templateUrl:'views/User/search.html',controller:'SearchUserController'})
      .when('/Users/new',{templateUrl:'views/User/detail.html',controller:'NewUserController'})
      .when('/Users/edit/:UserId',{templateUrl:'views/User/detail.html',controller:'EditUserController'})
      .otherwise({
        redirectTo: '/'
      });
  }])
  .controller('LandingPageController', function LandingPageController($scope, SessionService) {
	  $scope.isConnected = SessionService.userConnected();
	  console.log($scope.isConnected);
  })
  .controller('NavController', function NavController($scope, $location) {
    $scope.matchesRoute = function(route) {
        var path = $location.path();
        return (path === ("/" + route) || path.indexOf("/" + route + "/") == 0);
    };
  });

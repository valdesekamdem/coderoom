angular.module('coderoom').factory('PendingCourseResource', function($resource){
    var resource = $resource('rest/pendingcourses/:PendingCourseId',{PendingCourseId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});
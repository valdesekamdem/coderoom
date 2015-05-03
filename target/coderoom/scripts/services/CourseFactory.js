angular.module('coderoom').factory('CourseResource', function($resource){
    var resource = $resource('rest/courses/:CourseId',{CourseId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});
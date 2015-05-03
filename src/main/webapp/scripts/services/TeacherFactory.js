angular.module('coderoom').factory('TeacherResource', function($resource){
    var resource = $resource('rest/teachers/:TeacherId',{TeacherId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});
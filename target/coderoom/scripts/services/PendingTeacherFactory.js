angular.module('coderoom').factory('PendingTeacherResource', function($resource){
    var resource = $resource('rest/pendingteachers/:PendingTeacherId',{PendingTeacherId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});
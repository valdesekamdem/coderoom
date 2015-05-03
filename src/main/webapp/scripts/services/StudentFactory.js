angular.module('coderoom').factory('StudentResource', function($resource){
    var resource = $resource('rest/students/:StudentId',{StudentId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});
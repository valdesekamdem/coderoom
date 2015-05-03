angular.module('coderoom').factory('UserResource', function($resource){
    var resource = $resource('rest/users/:UserId',{UserId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});
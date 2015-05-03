angular.module('coderoom').factory('FollowSessionResource', function($resource){
    var resource = $resource('rest/followsessions/:FollowSessionId',{FollowSessionId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});
angular.module('coderoom').factory('PendingExerciseResource', function($resource){
    var resource = $resource('rest/pendingexercises/:PendingExerciseId',{PendingExerciseId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});
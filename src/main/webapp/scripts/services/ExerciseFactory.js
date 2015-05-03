angular.module('coderoom').factory('ExerciseResource', function($resource){
    var resource = $resource('rest/exercises/:ExerciseId',{ExerciseId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});
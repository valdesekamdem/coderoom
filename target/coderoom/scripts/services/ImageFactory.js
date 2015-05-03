angular.module('coderoom').factory('ImageResource', function($resource){
    var resource = $resource('rest/images/:ImageId',{ImageId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});
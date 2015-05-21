angular.module('coderoom')
.factory('StudentResource', function($resource){
    var resource = $resource('rest/students/:StudentId',{StudentId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
})
.factory('CompteResource' , function ($http) {
	var url = 'rest/studentAccounts'; 
	var service = {};
	
	service.save = function(compte){
		return $http.post(url ,compte);
	};
	return service;
	
});
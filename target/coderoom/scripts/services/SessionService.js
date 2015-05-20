angular.module('coderoom')
.factory("SessionService", function () {
	var sessionService = {};
	var userAuth = {};
	var isConnected = false;
	
	sessionService.setUser = function (user) {
		userAuth = user;
		isConnected = true;
	}
	
	sessionService.getUser = function () {
		return userAuth
	}
	
	sessionService.deleteUser = function () {
		userAuth = {};
		isConnected = false;
	}

	sessionService.userConnected = function () {
		return isConnected;
	};
	
	return sessionService;
});
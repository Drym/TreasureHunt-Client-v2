var app = angular.module('myApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
	
	var firstPageState = {
		name : 'firstPageState',
		url : '/',
		templateUrl : 'view/firstPage.html',
		controller : 'firstCtrl'
	}

	var secondPageState = {
		name : 'secondPageState',
		url : '/second',
		templateUrl : 'view/secondPage.html',
		controller : 'secondCtrl'
	}

	var thirdPageState = {
		name : 'thirdPageState',
		url : '/third',
		templateUrl : 'view/thirdPage.html',
		controller : 'thirdCtrl'
	}

	$stateProvider.state(firstPageState);
	$stateProvider.state(secondPageState);
	$stateProvider.state(thirdPageState);
	$urlRouterProvider.otherwise('/');
})
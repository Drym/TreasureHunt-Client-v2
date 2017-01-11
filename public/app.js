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

	$stateProvider.state(firstPageState);
	$stateProvider.state(secondPageState);
	$urlRouterProvider.otherwise('/');

	// use the HTML5 History API
	$locationProvider.html5Mode(true);
})
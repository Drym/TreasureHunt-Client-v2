app.controller("firstCtrl", function($scope, socketFactory){
	$scope.test = "test";

	$scope.socketFactory = socketFactory;

	$scope.submit = submitFunc;

	function submitFunc() {

		// var pseudo = document.getElementById("pseudo").value;
		// var team = document.getElementById("team").value;
		console.log($scope.pseudo, $scope.team);

		// TODO : Envoyer pseudo et team au server

	}
});
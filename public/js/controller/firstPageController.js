app.controller("firstCtrl", function($scope){
	$scope.test = "test";

	$scope.submit = submitFunc;

	function submitFunc() {

		var pseudo = document.getElementById("pseudo").value;
		var team = document.getElementById("team").value;

		console.log(pseudo, team);
	}
});
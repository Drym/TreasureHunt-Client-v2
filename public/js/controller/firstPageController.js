app.controller("firstCtrl", function($scope, socketFactory, $rootScope){

	//Variables dans le scope
	$scope.socketFactory = socketFactory;

    //Functions dans le scope
	$scope.submit = submitFunc;

    /**
     * Envoie le pseudo et l'équipe du joueur au serveur
     */
	function submitFunc() {
		//console.log($scope.pseudo, $scope.team);
		if($scope.pseudo &&  $scope.team) {
			socketFactory.sendNameTeam($scope.pseudo, $scope.team);
		}
	}
});
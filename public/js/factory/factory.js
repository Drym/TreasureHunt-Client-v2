app.factory('socketFactory', function($rootScope, $state){
	var socketFactory = {};

	socketFactory.isConnected = false;
	socketFactory.isEnigme = false;

	var socket = io('http://10.188.209.159:8080');

	/**
	 * Envoie le pseudo et l'équipe dans nouveau joueur
	 * @param name
	 * @param team
	 */
	socketFactory.sendNameTeam = function(name, team) {
	    console.log("Socket emit : newUser");
		socket.emit('newUser', {'name' : name, 'team' : team});
	};

	/**
	 * Envoie la position de l'utilisateur
	 * @param lat
	 * @param lng
	 */
    socketFactory.sendPosition = function(lat, lng) {
        console.log("Socket emit : sendPosition");
	 	socket.emit('sendPosition', {'latitude' : lat, 'longitude' : lng});
    };

    /**
     * Envoie la reponse de l'utilisateur
     * @param answer
     * @param photo
     */
	socketFactory.sendAnswer = function(answer, photo) {
		//socketFactory.isEnigme
        console.log("Socket emit : sendAnswer");
		socket.emit('sendAnswer', {'answer' : answer, 'photo' : photo})
	};

    /**
     * Demande un indice
     * @param enigme
     */
	socketFactory.askClue = function(enigme){
        console.log("Socket emit : askClue");
		socket.emit('askClue', enigme);
	}

    /**
     * Demande les zones de jeu
     */
    socketFactory.askAreas = function(){
        console.log("Socket emit : askAreas");
        socket.emit('areasRequest');
    }

    /**
     * Lorsque l'on recoit une connexion
     */
    socket.on('connexion', function(isConnected) {
        console.log("Socket on : connexion");
		socketFactory.isConnected = isConnected;
	})

    /**
     * Lorsque l'on recoit une enigme
     */
	socket.on('enigme', function(data) {
        console.log("Socket on : enigme");
		socketFactory.isEnigme = true;
		console.log('enigme : ' + JSON.stringify(data))
	});

    /**
     * Lorsque l'on recoit les zones
     */
	socket.on('areas', function(data) {
        console.log("Socket on : areas");
		//console.log('areas : ' + JSON.stringify(data));

        //Broadcast des données sur la clef 'areas'
        $rootScope.$broadcast('areas',  JSON.parse(JSON.stringify(data)));
	 });

    /**
     * Lorsque l'on recoit la confirmation de connexion
     */
	socket.on('response', function(data) {
        console.log("Socket on : response");

		if(data == "ok") { // OK ou KO
			socketFactory.isConnected = true;
			$state.go('secondPageState');

            socketFactory.askAreas();
		}
	});

	return socketFactory;
});
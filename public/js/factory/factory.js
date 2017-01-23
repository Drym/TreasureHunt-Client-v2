app.factory('socketFactory', function($rootScope, $state){
	var socketFactory = {};

	socketFactory.isConnected = false;
	socketFactory.isEnigme = false;
	socketFactory.teamId;

	var socket = io('http://10.212.99.100:8080');

	/**
	 * Envoie le pseudo et l'équipe dans nouveau joueur
	 * @param name
	 * @param team
	 */
	socketFactory.sendNameTeam = function(name, team) {
	    console.log("Socket emit : newUser");
	    socketFactory.teamId = team;
		socket.emit('newUser', {'name' : name, 'team' : team});
	};

	/**
	 * Envoie la position de l'utilisateur
	 * @param lat
	 * @param lng
	 */
    socketFactory.sendPosition = function(lat, lng) {
        console.log("Socket emit : sendPosition");
	 	socket.emit('sendPosition', {'id': socketFactory.teamId, 'data': {'latitude' : lat, 'longitude' : lng}});
    };

    /**
     * Envoie la reponse de l'utilisateur
     * @param answer
     * @param photo
     */
	socketFactory.sendAnswer = function(answer, photo) {
		//socketFactory.isEnigme
        console.log("Socket emit : sendAnswer");
		socket.emit('sendAnswer', {'id': socketFactory.teamId, 'data' : {'answer' : answer, 'photo' : photo}});
	};


	/**
	* Envoie l'id de la zone dans laquelle l'utilisateur est
	* @param areaId
	*/
	socketFactory.getEnigme = function(areaId) {
		console.log('Socket emit : getEnigme');
		socket.emit('enigmaRequest', {'id': socketFactory.teamId, 'data' : {'areaId' : areaId}});
	}

    /**
     * Demande un indice
     * @param enigme
     */
	socketFactory.askClue = function(enigmeId){
        console.log("Socket emit : askClue");
		socket.emit('askClue', {'id' : socketFactory.teamId, 'data' : {'enigmeId' : enigmeId}});
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
	socket.on('enigmaRequest', function(data) {
        console.log("Socket on : enigme");
		socketFactory.isEnigme = true;
		console.log('enigme : ' + JSON.stringify(data));

        $rootScope.$broadcast('enigme',  JSON.parse(JSON.stringify(data)));
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
	socket.on('response', function(data) { //TODO changer la clef 'response' ?
        console.log("Socket on : response");

		if(data == "ok") { // OK ou KO
			socketFactory.isConnected = true;
			$state.go('secondPageState');

            socketFactory.askAreas();
		}
	});

    /**
     * Retour du résultat de l'enigme
     */
    socket.on('response-enigma', function(data) {
        console.log("Socket on : response-enigma"); // ok ou ko
        $rootScope.$broadcast('response-enigma',  data);
    });

	/**
	 * Retour du résultat d'une demande d'indice
	 */
	socket.on('response-clue', function(data) {
		console.log("Socket on : response-clue");
		$rootScope.$broadcast('response-clue',  data);
	});


	return socketFactory;
});
app.factory('socketFactory', function($rootScope, $state, localStorageService){
	var socketFactory = {};

	socketFactory.isConnected = localStorageService.get('isConnected');
	socketFactory.isEnigme = false;
	socketFactory.teamId = localStorageService.get('teamId');
	socketFactory.name = localStorageService.get('name');

	var socket = io('http://localhost:8080');
    //var socket = io('https://treasure-hunt-pns.herokuapp.com');

	/**
	 * Envoie le pseudo et l'équipe dans nouveau joueur
	 * @param name
	 * @param team
	 */
	socketFactory.sendNameTeam = function(name, team) {
	    console.log("Socket emit : newUser");
	    socketFactory.teamId = team;
	    socketFactory.name = name;
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
	socketFactory.sendAnswer = function(answer, photo, enigmeId) {
		//socketFactory.isEnigme
        console.log("Socket emit : sendAnswer");
		socket.emit('sendAnswer', {'id': socketFactory.teamId, 'data' : {'enigmeId' : enigmeId, 'answer' : answer, 'photo' : photo}});
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
     * Demande les zones de jeu
     */
    socketFactory.sendMessage = function(message){
        console.log("Socket emit : sendMessage");
        socket.emit('newMessage', {'id' : socketFactory.teamId, 'name' : socketFactory, 'message' : message});
    }

    socket.on('newMessage', function(message) {
        console.log("Socket on : newMessage");
    	$rootScope.$broadcast('newMessage', message);
    });

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
        console.log("Socket on : response (après connexion)	");
        console.log("rooms : " + socket.rooms);

		if(data == "ok") { // OK ou KO
			socketFactory.isConnected = true;
			localStorageService.set('name', socketFactory.name);
			localStorageService.set('teamId', socketFactory.teamId);
			localStorageService.set('isConnected', socketFactory.isConnected);
			$state.go('secondPageState');
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
	socket.on('responseClue', function(data) {
		console.log("Socket on : responseClue");
		$rootScope.$broadcast('responseClue',  data);
	});

	// window.onbeforeunload = function(event) {
	// 	console.log('On before unload');
	// 	localStorageService.set('name', socketFactory.name);
	// 	localStorageService.set('teamId', socketFactory.teamId);
	// 	localStorageService.set('isConnected', socketFactory.isConnected);
	// }

	return socketFactory;
});
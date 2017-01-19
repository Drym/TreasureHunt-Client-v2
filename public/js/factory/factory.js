app.factory('socketFactory', function($rootScope, $state){
	var socketFactory = {};

	socketFactory.isConnected = false;
	socketFactory.isEnigme = false;

	var socket = io('http://10.212.99.100:8080');

	socketFactory.sendNameTeam = function(name, team) {
		socket.emit('newUser', {'name' : name, 'team' : team});
	};

	socketFactory.sendPosition = function(position) {
		socket.emit('sendPosition', position);
	};

	socketFactory.sendAnswer = function(answer) {
		//socketFactory.isEnigme
		socket.emit('sendAnswer', answer)
	};

	socketFactory.askClue = function(enigme){
		socket.emit('askClue', enigme);
	}

	socket.on('connexion', function(isConnected) {
		socketFactory.isConnected = isConnected;
	})

	socket.on('enigme', function(data) {
		socketFactory.isEnigme = true;
		console.log('enigme : ' + JSON.stringify(data))
	});

	socket.on('areas', function(data) {
		console.log('areas : ' + JSON.stringify(data));

		socketFactory.areas = data;
	});

	socket.on('response', function(data) {
		console.log('response : ' + data); // OK ou KO

		if(data == "ok") {
			$rootScope.$broadcast('response-ok');
			socketFactory.isConnected = false;
			$state.go('secondPageState');
		}
	});

	return socketFactory;
});
app.factory('socketFactory', function(){
	var socketFactory = {};

	socketFactory.isConnected = false;
	socketFactory.isEnigme = false;

	var socket = io('http://localhost:8080');

	socketFactory.sendNameTeam = function(name, team) {
		socket.emit('newUser', {'name' : name, 'team' : team});
	};

	socketFactory.sendPosition = function(position) {
		socket.emit('sendPosition', position);
	};

	socketFactory.sendAnswer = function(answer) {
		socket.emit('sendAnswer', answer)
	};

	socket.on('connexion', function(isConnected) {
		socketFactory.isConnected = isConnected;
	})

	socket.on('enigme', function(data) {
		socketFactory.isEnigme = true;
		console.log('enigme : ' + JSON.stringify(data))
	});

	socket.on('areas', function(data) {
		console.log('areas : ' + JSON.stringify(data));
	});

	return socketFactory;
});
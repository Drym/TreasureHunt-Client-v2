app.factory('socketFactory', function($rootScope){
	var socketFactory = {};

	socketFactory.isConnected = false;
	socketFactory.isEnigme = false;

	var socket = io('http://10.212.99.100:8080');

	socketFactory.sendNameTeam = function(name, team) {
		socket.emit('newUser', {'name' : name, 'team' : team});
	};

    socketFactory.sendPosition = function(position) {
	 	console.log('sendPosition');
	 	socket.emit('sendPosition', position);
    };

	socketFactory.sendAnswer = function(answer) {
		//socketFactory.isEnigme
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

		 $rootScope.$broadcast('areas', data);
	 });

	socket.on('response', function(data) {
		console.log('response : ' + data); //ok ou ko

		if(data == "ok") {
			$rootScope.$broadcast('response-ok');
			socketFactory.isConnected = false;
		}
	});

	return socketFactory;
});
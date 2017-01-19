app.factory('socketFactory', function($rootScope, $state){
	var socketFactory = {};

	socketFactory.isConnected = false;
	socketFactory.isEnigme = false;

	var socket = io('http://10.212.99.100:8080');

	socketFactory.sendNameTeam = function(name, team) {
		socket.emit('newUser', {'name' : name, 'team' : team});
	};

    socketFactory.sendPosition = function(lat, lng) {
	 	socket.emit('sendPosition', {'latitude' : lat, 'longitude' : lng});
    };

	socketFactory.sendAnswer = function(answer, photo) {
		//socketFactory.isEnigme
		socket.emit('sendAnswer', {'answer' : answer, 'photo' : photo})
	};

	socketFactory.askClue = function(enigme){
		socket.emit('askClue', enigme);
	}

    socketFactory.askAreas = function(){
        socket.emit('areasRequest');
    }

    socket.on('connexion', function(isConnected) {
		socketFactory.isConnected = isConnected;
	})

	socket.on('enigme', function(data) {
		socketFactory.isEnigme = true;
		console.log('enigme : ' + JSON.stringify(data))
	});

	socket.on('areas', function(data) {

		console.log(data[0]);
		var test = [{'a':'a', 'b':'b'}];
		console.log(test);
        $rootScope.$broadcast('areas',  data);
	 });

	socket.on('response', function(data) {
		console.log('response : ' + data); // OK ou KO

		if(data == "ok") {
			$rootScope.$broadcast('response-ok');
			socketFactory.isConnected = true;
			$state.go('secondPageState');

            socketFactory.askAreas();
		}
	});

	return socketFactory;
});
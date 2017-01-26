app.controller("thirdCtrl", function($scope, $rootScope, socketFactory) {
	$scope.messages = [];

	$scope.myName = socketFactory.name;

	$scope.sendMessage = function(message) {
		socketFactory.sendMessage({'user': socketFactory.name, 'content' : message});
	}

	$rootScope.$on('newMessage', function(event, data) {
		console.log("new message rootscope");
		$scope.messages.push(data.message);
		$scope.$apply();
		var chat = document.getElementById("messages");
		if(chat) {
			chat.scrollTop = chat.scrollHeight;
		}
	})
});

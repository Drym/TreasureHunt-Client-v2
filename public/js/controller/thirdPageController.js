app.controller("thirdCtrl", function($scope, $rootScope, socketFactory, chatFactory) {
	$scope.chatFactory = chatFactory;

	$scope.myName = socketFactory.name;

	$scope.sendMessage = function(message) {
		socketFactory.sendMessage({'user': socketFactory.name, 'content' : message});
	}

	function scrollBottom() {
		var chat = document.getElementById("messages");
		if(chat) {
			chat.scrollTop = chat.scrollHeight;
		}
	}

	$rootScope.$on('newMessage', function(event, data) {
		scrollBottom();
	})
});

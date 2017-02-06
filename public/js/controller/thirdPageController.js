app.controller("thirdCtrl", function($scope, $rootScope, socketFactory, chatFactory) {


	$scope.chatFactory = chatFactory;
	$scope.myName = socketFactory.name;

    /**
     * Envoie un message
     * @param message
     */
	$scope.sendMessage = function(message) {
		socketFactory.sendMessage({'user': socketFactory.name, 'content' : message});
	};

    /**
     * Scroll automatiquement en bas de la page
     */
	function scrollBottom() {
		var chat = document.getElementById("messages");
		if(chat) {
			chat.scrollTop = chat.scrollHeight;
		}
	}

    /**
     * Reception d'un nouveau message
     */
	$rootScope.$on('newMessage', function(event, data) {
		scrollBottom();
	})
});

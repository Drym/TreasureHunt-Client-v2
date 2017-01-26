app.factory('chatFactory', function($rootScope){
	var chatFactory = []

	chatFactory.messages = [];

	$rootScope.$on('newMessage', function(event, data) {
		console.log("new message rootscope");
		chatFactory.messages.push(data.message);
		$rootScope.$apply();
	})

	return chatFactory;
})
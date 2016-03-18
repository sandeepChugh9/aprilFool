(function() {
	var setDataCallback = platformSdk.events.subscribe('webview/data/loaded', function() {

		platformSdk.card =  "books";

		var shareCardIcon = document.getElementById("shareCard");
		var shareMessage;
		var captionText;

		if (shareCardIcon) {
			shareCardIcon.addEventListener('click', function(e) {

                platformSdk.bridge.forwardToChat(null);    
			});
		}

		setDataCallback.remove();
	});
})();
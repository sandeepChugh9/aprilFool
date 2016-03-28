(function() {
    var setDataCallback = platformSdk.events.subscribe('webview/data/loaded', function() {

        platformSdk.bridgeEnabled = true;
        
        document.addEventListener('click', function(ev) {
            console.log("Opening Microapp");

            var serverUrl = 'http://mapps.platform.hike.in/mapps/api/v1/apps/';
            var appName = '+hikearoma+';

            platformSdk.nativeReqT({
                fn: 'openNonMessagingBot',
                ctx: this,
                data: [appName,true],
                success: function(response) {
                    if (response == 'Failure') {
                        platformSdk.ui.showToast('Some error occured, please try again after some time!');
                        var obj = {
                            'appName': [appName],
                            'msisdn': ''
                        };

                        var data = {
                            url: serverUrl + 'install.json',
                            params: obj
                        };

                        data = JSON.stringify(data);

                        platformSdk.nativeReq({
                            fn: 'doPostRequest',
                            ctx: this,
                            data: data,
                            success: function(res) {
                                res = JSON.parse(decodeURIComponent(res));
                                if (res.status == 'success') {
                                    platformSdk.nativeReq({
                                        fn: 'openNonMessagingBot',
                                        ctx: this,
                                        data: appName,
                                        success: function(response) {
                                            console.log(response);
                                            if (response == 'Failure') {
                                                platformSdk.ui.showToast('Hmm. Something went wrong. Not to worry, try again in a little bit :)');
                                            }
                                        }
                                    });
                                }

                            }
                        });
                    }
                },

                error: function(xhr) {
                    platformSdk.ui.showToast('Hmm. Something went wrong. Not to worry, try again in a little bit :)');
                }
            });

        });


        setDataCallback.remove();
    });
})();
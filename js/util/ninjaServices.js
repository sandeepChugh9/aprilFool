(function(W, platformSdk) {
    'use strict';

    var utils = require('./utils.js');
    var checkTimeout = null;
    var suffix = '?random=' + Math.round(Math.random() * 999999999);

    var ninjaServices = function(service) {
        this.ninjaServices = service;
    };

    var URL = {
        location: appConfig.API_URL,
    };

    ninjaServices.prototype = {

        logData: function(obj) {
            var analyticEvents = {};

            if (obj)
                for (var key in obj) {
                    analyticEvents[key] = obj[key];
                }

            //analyticEvents['ek'] = "aprilFool";

            platformSdk.utils.logAnalytics("true", "click", analyticEvents);
        }


    };

    module.exports = ninjaServices;

})(window, platformSdk);
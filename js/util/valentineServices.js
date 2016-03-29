(function(W, platformSdk) {
    'use strict';

    var utils = require('./utils.js');
    var checkTimeout = null;
    var suffix = '?random=' + Math.round(Math.random() * 999999999);

    var ValentineServices = function(service) {
        this.ValentineServices = service;
    };

    var URL = {
        location: appConfig.API_URL,
    };

    ValentineServices.prototype = {

        logData:function(obj){
             var analyticEvents = {};

             if(obj)
                 for(var key in obj){
                    analyticEvents[key] = obj[key];
                 }

             platformSdk.utils.logAnalytics("true", "click", analyticEvents);
        }


    };

    module.exports = ValentineServices;

})(window, platformSdk);
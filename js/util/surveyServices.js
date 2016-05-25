(function(W, platformSdk) {
    'use strict';

    var utils = require('./utils.js');
    var checkTimeout = null;
    var suffix = '?random=' + Math.round(Math.random() * 999999999);

    var surveyServices = function(service) {
        this.surveyServices = service;
    };

    var URL = {
        location: appConfig.API_URL,
        logUrl: appConfig.LOG_URL
    };

    var i = 1456;

    surveyServices.prototype = {

        logData: function(data) {


            data.k = "act_exp";
            data.p = "survey";


            if (platformSdk.bridgeEnabled) {
                data.fa = platformSdk.appData.helperData.surveyId;
                data.vi = Object.keys(platformSdk.appData.helperData.questions).length;
                data.src = platformSdk.appData.helperData.surveyType;
                platformSdk.utils.logAnalytics("true", "click", data);

            } else {
                data.fa = 123;
                data.vi = 9;
                data.src = "sequential";


                console.log(data);
            }
        }


    };

    module.exports = surveyServices;

})(window, platformSdk);
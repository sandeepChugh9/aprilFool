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


        // Hike Stats Fron URL
        getProfile: function(fn, x) {
            var params = {
                'url': URL.location + '/profile?random=' + Math.round(Math.random() * 999999999),
                'type': 'GET',
                'loader': true
            };
            if (typeof fn === 'function') return this.ninjaServices.communicate(params, fn, x);
            else this.ninjaServices.communicate(params);
        },


        // Hike Stats Fron URL
        getHikeStats: function(fn, x) {
            var params = {
                'url': URL.location + '/stats?random=' + Math.round(Math.random() * 999999999),
                'type': 'GET',
                'loader': true
            };
            if (typeof fn === 'function') return this.ninjaServices.communicate(params, fn, x);
            else this.ninjaServices.communicate(params);
        },

        //Trophy Data From URL
        getTrophyData: function(fn, x) {
            var params = {
                'url': URL.location + '/trophies?random=' + Math.round(Math.random() * 999999999),
                'type': 'GET',
                'loader': true
            };
            if (typeof fn === 'function') return this.ninjaServices.communicate(params, fn, x);
            else this.ninjaServices.communicate(params);
        },


        logData: function(obj) {
            var analyticEvents = {};

            if (obj)
                for (var key in obj) {
                    analyticEvents[key] = obj[key];
                }

            //analyticEvents['ek'] = "aprilFool";

            platformSdk.utils.logAnalytics("true", "click", analyticEvents);
        },

    };

    module.exports = ninjaServices;

})(window, platformSdk);
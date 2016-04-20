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
        logUrl: appConfig.LOG_URL
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
                'type': 'GET'
            };
            if (typeof fn === 'function') return this.ninjaServices.communicate(params, fn, x);
            else this.ninjaServices.communicate(params);
        },

        // Log Ninja Data :: Server Side Logging :: Send Event and Client Side Timestamp For Logs
        logNinjaData: function(fn, data){
            return;
            console.log("Sending Logging Ninja Call To Server");
            
            var cTime = new Date();
            data.cts = cTime.getTime();

            console.log(data);

            var params = {
                'url'   : URL.logUrl,
                'type'  : 'POST',
                'data'  : data,
                'loader': false
            };
            if ( typeof fn === 'function' ) return this.ValentineServices.communicate( params, fn, x );
            else this.ValentineServices.communicate( params );
        }


        // logData: function(obj) {
        //     var analyticEvents = {};

        //     if (obj)
        //         for (var key in obj) {
        //             analyticEvents[key] = obj[key];
        //         }

        //     //analyticEvents['ek'] = "aprilFool";

        //     platformSdk.utils.logAnalytics("true", "click", analyticEvents);
        // },

    };

    module.exports = ninjaServices;

})(window, platformSdk);
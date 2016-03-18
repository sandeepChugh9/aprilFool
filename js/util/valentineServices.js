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

        // Subscribe
        subscribeToValentine: function(fn, x) {
            var params = {
                'url': URL.location + '/subscribe?random=' + Math.round(Math.random() * 999999999),
                'type': 'POST',
                'loader': true
            };
            if (typeof fn === 'function') return this.ValentineServices.communicate(params, fn, x);
            else this.ValentineServices.communicate(params);
        },


    };

    module.exports = ValentineServices;

})(window, platformSdk);
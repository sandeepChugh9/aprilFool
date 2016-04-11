(function() {
    'use strict';

    var Constants = require('./constants');

    module.exports = function(env) {
        if (env === Constants.DEV_ENV) {
            return {
                API_URL: '',

            };
        } else if (env === Constants.STAGING_ENV) {
            return {
                API_URL: '',


            };
        } else if (env === Constants.PROD_ENV) {
            return {
                API_URL: '',

            };
        }

        return {};
    };
})();
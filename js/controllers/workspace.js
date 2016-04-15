(function(W, platformSdk, events) {
    'use strict';

    var utils = require('../util/utils'),
        Constants = require('../../constants.js'),

        TrophiesController = function(options) {
            this.template = require('raw!../../templates/workspace.html');
        };

    TrophiesController.prototype.bind = function(App) {
        var $el = $(this.el);

        var btn = document.getElementById('btnAction');

        btn.addEventListener('click', function(ev) {
            App.ninjaServices.getTrophyData(function(res) {
                console.log(res);
                if (res.stat == 'success') {
                    // Awarded Trophies Into The Response :: Match the Count Here
                    platformSdk.appData.helperData.aTrophies = res;
                    platformSdk.updateHelperData(platformSdk.appData.helperData.aTrophies);
                    App.router.navigateTo('/trophies', Constants.TROPHIES);
                } else {
                    platformSdk.ui.showToast('Hmm. Something went wrong. Not to worry, try again in a little bit :)');
                }
            });
        });

    };

    TrophiesController.prototype.render = function(ctr, App, data) {

        var that = this;

        that.el = document.createElement('div');
        that.el.className = 'workSpaceContainer animation_fadein noselect';
        that.el.innerHTML = Mustache.render(unescape(that.template), { userData: data });
        ctr.appendChild(that.el);
        events.publish('update.loader', { show: false });


        try {
            PlatformBridge.changeBotTitle( 'Stats' );
        } catch ( e ) {
            console.log( 'Error in changing bot title' );
        }

        that.bind(App);
    };

    TrophiesController.prototype.destroy = function() {

    };

    module.exports = TrophiesController;

})(window, platformSdk, platformSdk.events);
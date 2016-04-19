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
        var age = document.getElementById('hikeAge').getAttribute('data-age');

        var upgradeHeading = document.getElementsByClassName('upgradeHeading')[0];
        var trophiesCount = document.getElementById('trophyCount').getAttribute('data-count');
        var upgradeOverlay = document.getElementsByClassName('upgradeOverlay')[0];

        upgradeHeading.addEventListener('click', function(ev) {
            window.open("https://play.google.com/store/apps/details?id=com.bsb.hike");
        });

        console.log(data.hikeLatestVersion);

        btn.addEventListener('click', function(ev) {

            if (!platformSdk.bridgeEnabled) {

                // Run the API call only if the
                if ((platformSdk.appData.helperData.aTrophies) && (platformSdk.appData.helperData.aTrophies.count === trophiesCount)) {
                    console.log('Either this is the First Time Call :: Or the trophies count has not changed');
                    App.router.navigateTo('/trophies', { trophiesData: Constants.TROPHIES, age: age });
                } else {
                    console.log('Getting the new trophies for the first time or the trophies have changed');
                    App.ninjaServices.getTrophyData(function(res) {
                        console.log(res);
                        if (res.stat == 'success') {
                            // Awarded Trophies Into The Response :: Match the Count Here
                            platformSdk.appData.helperData.aTrophies = res;
                            platformSdk.updateHelperData(platformSdk.appData.helperData.aTrophies);
                            App.router.navigateTo('/trophies', { trophiesData: Constants.TROPHIES, age: age });
                        } else {
                            platformSdk.ui.showToast('Hmm. Something went wrong. Not to worry, try again in a little bit :)');
                        }
                    });
                }

            } else {
                age = 26;
                App.router.navigateTo('/trophies', { trophiesData: Constants.TROPHIES, age: age });

            }

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
            PlatformBridge.changeBotTitle('Stats');
        } catch (e) {
            console.log('Error in changing bot title');
        }

        that.bind(App,data);
    };

    TrophiesController.prototype.destroy = function() {

    };

    module.exports = TrophiesController;

})(window, platformSdk, platformSdk.events );

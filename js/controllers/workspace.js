(function(W, platformSdk, events) {
    'use strict';

    var utils = require('../util/utils'),
        Constants = require('../../constants.js'),

        WorkspaceController = function(options) {
            this.template = require('raw!../../templates/workspace.html');
        };

    WorkspaceController.prototype.bind = function(App, data) {
        var $el = $(this.el);

        var btn = document.getElementById('btnAction');
        var age = document.getElementById('hikeAge').getAttribute('data-age');

        var upgradeHeading = document.getElementsByClassName('upgradeHeading')[0];
        var trophiesCount = document.getElementById('trophyCount').getAttribute('data-count');
        var upgradeOverlay = document.getElementsByClassName('upgradeOverlay')[0];

        var topTag = document.getElementsByClassName('topHeading');
        var crossIcon = document.getElementsByClassName('crossIcon')[0];
        var topTagOverlay = document.getElementsByClassName('topTagOverlay')[0];

        upgradeHeading.addEventListener('click', function(ev) {
            window.open('https://play.google.com/store/apps/details?id=com.bsb.hike');
        });


        var currentVersion = '';
        var userVersion = '';

        if (!platformSdk.appData.appVersion || !data.hikeLatestVersion) {
            console.log('No app version exists');
        } else {
            if (platformSdk.bridgeEnabled) {
                currentVersion = data.hikeLatestVersion.split('.');
                userVersion = platformSdk.appData.appVersion.split('.');
            } else {
                currentVersion = '4.2.5.82';
                userVersion = '4.2.5.82';
            }

            currentVersion = currentVersion.split('.');
            userVersion = userVersion.split('.');

            var length = Math.min(currentVersion.length, userVersion.length);

            for (var index = 0; index < length; index++) {
                if (currentVersion[index] == userVersion[index])
                    console.log('Version number matching');
                else if (userVersion[index] < currentVersion[index]) {
                    console.log('User version is older :: Taking to Upgrade screen');

                    // Adding upgrade Overlay over it
                    upgradeOverlay.classList.remove('hide');
                }
            }
        }
        for (var i = 0, n = topTag.length; i < n; i++)
            topTag[i].addEventListener('click', topTagPopUp, false);


        function topTagPopUp() {
            topTagOverlay.classList.remove('hide');
            topTagOverlay.querySelectorAll('.topStat')[0].innerHTML = this.getAttribute('data-topTag') + '%';
            topTagOverlay.querySelectorAll('.topStat')[1].innerHTML = this.getAttribute('data-topTag') + '%';
            topTagOverlay.querySelectorAll('.infoSection')[0].innerHTML = this.getAttribute('data-info');
            topTagOverlay.querySelectorAll('.levelCommon')[0].classList.remove(['topTagLevel1', 'topTagLevel2', 'topTagLevel3'])
            topTagOverlay.querySelectorAll('.levelCommon')[0].classList.add('topTagLevel' + this.getAttribute('data-topTagLevel'));


        }

        crossIcon.addEventListener('click', function(ev) {
            topTagOverlay.classList.add('hide');
        });

        btn.addEventListener('click', function(ev) {

            if (platformSdk.bridgeEnabled) {

                // Run the API call only if the
                // if ((platformSdk.appData.helperData.aTrophies) && (platformSdk.appData.helperData.aTrophies.count === trophiesCount)) {
                //     console.log('Either this is the First Time Call :: Or the trophies count has not changed');
                //     App.router.navigateTo('/trophies', { trophiesData: Constants.TROPHIES, age: age });
                // } else {
                //     console.log('Getting the new trophies for the first time or the trophies have changed');
                //     App.ninjaServices.getTrophyData(function(res) {
                //         console.log(res);
                //         if (res.stat == 'ok') {

                //             // Awarded Trophies Into The Response :: Match the Count Here
                //             platformSdk.appData.helperData.aTrophies = res;
                //             platformSdk.updateHelperData(platformSdk.appData.helperData.aTrophies);
                //             App.router.navigateTo('/trophies', { trophiesData: Constants.TROPHIES, age: age });
                //         } else {
                //             platformSdk.ui.showToast('Hmm. Something went wrong. Not to worry, try again in a little bit :)');
                //         }
                //     });
                // }

                console.log('Getting the new trophies for the first time or the trophies have changed');

                App.ninjaServices.getTrophyData(function(res) {
                    console.log(res);
                    if (res.stat == 'ok') {
                        // Awarded Trophies Into The Response :: Match the Count Here
                        platformSdk.appData.helperData.aTrophies = res;
                        platformSdk.updateHelperData(platformSdk.appData.helperData.aTrophies);
                        App.router.navigateTo('/trophies', { trophiesData: Constants.TROPHIES, age: age });
                    } else {
                        platformSdk.ui.showToast('Hmm. Something went wrong. Not to worry, try again in a little bit :)');
                    }
                });

            } else {
                age = 26;
                App.router.navigateTo('/trophies', { trophiesData: Constants.TROPHIES, age: age });

            }

        });

    };

    WorkspaceController.prototype.render = function(ctr, App, data) {

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


        App.ninjaServices.getHikeStats(function(res) {
            //console.log( res );
            if (res.stat == 'ok') {
                console.log('Updating Hike stats for user');
                platformSdk.appData.helperData.statsData = res;
                platformSdk.updateHelperData(platformSdk.appData.helperData);
            } else {
                console.log("error updating stats");
            }
        });


        that.bind(App, data);
    };

    WorkspaceController.prototype.destroy = function() {

    };

    module.exports = WorkspaceController;

})(window, platformSdk, platformSdk.events);
(function(W, platformSdk, events) {
    'use strict';

    var utils = require('../util/utils');

    var TrophiesController = function(options) {
        this.template = require('raw!../../templates/trophies.html');
    };

    TrophiesController.prototype.bind = function(App, data) {
        var $el = $(this.el);

        var trophyIdGlobal = null;
        var globalExperiment = null;

        var trophyOverlay = document.getElementsByClassName('trophyOverlay')[0];
        var rewardedTrophyIcons = document.getElementsByClassName('awarded');

        var allTrophies = document.getElementsByClassName('commonTrophy');

        var levelBronze = document.getElementsByClassName('levelBronze')[0];
        var levelSilver = document.getElementsByClassName('levelSilver')[0];
        var levelGold = document.getElementsByClassName('levelGold')[0];

        var crossIcon = document.getElementsByClassName('crossIcon')[0];

        var levelCommon = document.getElementsByClassName('levelCommon');

        var trophyHeading = document.getElementsByClassName('trophyHeading')[0];
        var levelText = document.getElementsByClassName('levelText')[0];
        var levelAction = document.getElementsByClassName('levelAction')[0];

        crossIcon.addEventListener('click', function(ev) {
            trophyOverlay.classList.add('hide');
            resetPopupClasses();
        });

        levelAction.addEventListener('click', function(ev) {
            trophyOverlay.classList.add('hide');
            resetPopupClasses();
        });

        var resetPopupClasses = function() {
            trophyIdGlobal = null;
            levelSilver.className = '';
            levelBronze.className = '';
            levelGold.className = '';

            trophyHeading.innerHTML = '';
            levelText.innerHTML = '';

            levelBronze.removeAttribute('style');
            levelSilver.removeAttribute('style');
            levelGold.removeAttribute('style');

            levelBronze.classList.add('levelCommon', 'levelBronze', 'backgroundImageGeneric');
            levelSilver.classList.add('levelCommon', 'levelSilver', 'backgroundImageGeneric');
            levelGold.classList.add('levelCommon', 'levelGold', 'backgroundImageGeneric');
        };

        var findSibling = function(child) {
            var result = [],
                node = child,
                test = child;

            while (node && node.nodeType === 1) {
                if (test != node)
                    result.push(node);
                node = node.nextElementSibling || node.nextSibling;
            }

            node = test;

            while (node && node.nodeType === 1) {
                if (test != node)
                    result.push(node);
                node = node.previousElementSibling || node.previousSibling;
            }

            return result;

        };

        var tapOnLockedTrophy = function() {
            console.log('Tapping on Locked Trophy');

            var level = this.getAttribute('data-level');

            if (this.classList.contains('levelLocked') && globalExperiment === 'exp3') {

                // Task is hidden
                if (data[trophyIdGlobal]) {
                    levelText.innerHTML = data[trophyIdGlobal].levels[level].textlocked;
                } else {
                    levelText.innerHTML = '';
                }

            } else {
                levelText.innerHTML = data[trophyIdGlobal].levels[level].textlocked;
            }

            var alreadyTapped = document.getElementsByClassName('levelLockTap');

            for (var t = 0; t < alreadyTapped.length; t++) {
                alreadyTapped[t].classList.remove('levelLockTap');
            }

            var result = findSibling(this);
            //console.log("Siblings are :", result);

            for (var z = 0; z < result.length; z++) {
                result[z].classList.add('levelLockNoTap');
            }


            //var level = this.getAttribute('data-level');
            this.classList.add('levelLockTap');

            var logDataToSend = {};
            logDataToSend.c = 'trophyView';
            logDataToSend.o = 'levelClick';
            logDataToSend.fa = 'level' + '_' + level;
            logDataToSend.g = data[trophyIdGlobal].label;
            logDataToSend.s = globalExperiment;

            App.ninjaServices.logNinjaData(logDataToSend);

        };

        var openTrophy = function() {

            var experiment = this.getAttribute('data-experiment');
            var tid = this.getAttribute('data-tid');
            var logDataToSend = {};
            trophyIdGlobal = tid;
            globalExperiment = experiment;

            trophyHeading.innerHTML = data[tid].label;

            if (this.classList.contains('awarded')) {
                console.log('Trophy is awarded');
                var awardedLevel = data[tid].curLevel;

                // Current Level Is zero :: Dont show any other Level
                if (awardedLevel === 0) {
                    console.log('Awarded Level 0');
                    levelBronze.style.backgroundImage = 'url(\'' + data[tid].levels[awardedLevel].icon + '\')';
                    levelSilver.classList.add('levelLocked');
                    levelSilver.classList.add('levelLockNoTap');
                    levelGold.classList.add('levelLocked');
                    levelGold.classList.add('levelLockNoTap');
                    levelText.innerHTML = data[tid].levels[awardedLevel].textunlocked;
                }

                // Current Level is 1 :: Show Zeroth Level Also
                else if (awardedLevel === 1) {
                    console.log('Awarded Level 1');
                    levelBronze.style.backgroundImage = 'url(\'' + data[tid].levels[awardedLevel - 1].icon + '\')';
                    levelSilver.style.backgroundImage = 'url(\'' + data[tid].levels[awardedLevel].icon + '\')';
                    levelGold.classList.add('levelLocked');
                    levelGold.classList.add('levelLockNoTap');
                    levelText.innerHTML = data[tid].levels[awardedLevel].textunlocked;
                }

                // Current Level is 2 :: Show zeroth and First Level both
                else if (awardedLevel === 2) {
                    console.log('Awarded Level 2');
                    levelBronze.style.backgroundImage = 'url(\'' + data[tid].levels[awardedLevel - 2].icon + '\')';
                    levelSilver.style.backgroundImage = 'url(\'' + data[tid].levels[awardedLevel - 1].icon + '\')';
                    levelGold.style.backgroundImage = 'url(\'' + data[tid].levels[awardedLevel].icon + '\')';
                    levelText.innerHTML = data[tid].levels[awardedLevel].textunlocked;
                }


                logDataToSend.c = 'trophyView';
                logDataToSend.o = 'trophyClick';
                logDataToSend.fa = 'unlocked' + '_' + awardedLevel;
                logDataToSend.g = data[tid].label;
                logDataToSend.s = globalExperiment;
                console.log('Opening Rewarded Trophy :: Show Level current and Locked for other Levels with task not hidden');
            }

            // Experiment 2 :: Non Hidden Tasks
            else if (this.classList.contains('locked') && experiment == 'exp2') {
                console.log('Experiment two :: Show Locked Trophy Task as well');

                // Bronze Active Currently
                levelBronze.classList.add('levelLocked');
                levelText.innerHTML = data[tid].levels[0].textlocked;

                // Silver Inactive
                levelSilver.classList.add('levelLocked');
                levelSilver.classList.add('levelLockNoTap');

                // Gold Inactive
                levelGold.classList.add('levelLocked');
                levelGold.classList.add('levelLockNoTap');

                logDataToSend.uk = 'trophyClick';
                logDataToSend.c = data[tid].label;
                logDataToSend.o = 'locked';
                logDataToSend.fa = 'experiment_2';

            }

            // Experiment 3 :: Hidden Tasks
            else if (this.classList.contains('locked') && experiment == 'exp3') {
                console.log('Experiment Three :: Dont Show Locked Trophy Task');

                trophyHeading.innerHTML = '????';

                levelBronze.classList.add('levelLocked');
                levelText.innerHTML = '';

                // Silver Inactive
                levelSilver.classList.add('levelLocked');
                levelSilver.classList.add('levelLockNoTap');

                // Gold Inactive
                levelGold.classList.add('levelLocked');
                levelGold.classList.add('levelLockNoTap');

                logDataToSend.uk = 'trophyClick';
                logDataToSend.c = data[tid].label;
                logDataToSend.o = 'locked';
                logDataToSend.fa = 'experiment_3';
            }

            // Show the Overlay now
            trophyOverlay.classList.remove('hide');

            App.ninjaServices.logNinjaData(logDataToSend);
        };

        // Attach trophy icons
        for (var i = 0; i < rewardedTrophyIcons.length; i++) {
            var trophyId = rewardedTrophyIcons[i].getAttribute('data-tid');
            var trophyEarnedLevel = data[trophyId].curLevel;
            rewardedTrophyIcons[i].style.backgroundImage = 'url(\'' + data[trophyId].levels[trophyEarnedLevel].icon + '\')';
        }

        for (var j = 0; j < allTrophies.length; j++) {
            allTrophies[j].addEventListener('click', openTrophy, false);
        }

        for (var z = 0; z < levelCommon.length; z++) {
            levelCommon[z].addEventListener('click', tapOnLockedTrophy, false);
        }

    };

    TrophiesController.prototype.render = function(ctr, App, data) {

        var that = this;
        var awardedTrophies;

        if (platformSdk.bridgeEnabled)

            awardedTrophies = platformSdk.appData.helperData.aTrophies;
        else {
            awardedTrophies = {
                'awarded': {
                    '1': 0,
                    '3': 1,
                    '5': 2,
                    '7': 2
                }
            };
        }

        if (data.diffDays >= 30 && data.diffDays < 365)
            awardedTrophies.awarded[0] = 0;
        else if (data.diffDays >= 365 && data.diffDays < 1095)
            awardedTrophies.awarded[0] = 1;
        else if (data.diffDays >= 1095)
            awardedTrophies.awarded[0] = 2;

        data = data.trophiesData;

        var exp2 = false,
            exp3 = false;

        for (var key in awardedTrophies.awarded) {
            data[key].awarded = 'true';
            data[key].curLevel = awardedTrophies.awarded[key];
        }

        // Logic 1 :: Only show Awarded Trophies and Not Show Any More upcoming Trophies

        if (platformSdk.bridgeEnabled) {
            if (platformSdk.appData.helperData.experiment == 2 && data)


                exp2 = true;

            // Logic 2 : Show Rewarded and Not Rewarded (Task Locked state)
            else if (platformSdk.appData.helperData.experiment == 3 && data)

                exp3 = true;

        } else {
            exp2 = true;
        }

        // Logic 3 : Show Rewarded and not Rewarded (Task Not Locked )

        that.el = document.createElement('div');
        that.el.className = 'smellOptInContainer animation_fadein noselect';
        that.el.innerHTML = Mustache.render(unescape(that.template), { experiment2: exp2, experiment3: exp3, trophiesData: data, awardedCount: Object.keys(awardedTrophies.awarded).length, totalCount: data.length });

        ctr.appendChild(that.el);
        events.publish('update.loader', { show: false });

        try {
            PlatformBridge.changeBotTitle('Trophies');
        } catch (e) {
            console.log('Error in changing bot title');
        }

        var logDataToSend = {};
        logDataToSend.o = 'completeLoad';
        logDataToSend.c = 'trophyView';

        App.ninjaServices.logNinjaData(logDataToSend);

        that.bind(App, data);
    };

    TrophiesController.prototype.destroy = function() {

    };

    module.exports = TrophiesController;

})(window, platformSdk, platformSdk.events);
(function(W, platformSdk, events) {
    'use strict';

    var utils = require('../util/utils');

    var WorkspaceController = function(options) {
        this.template = require('raw!../../templates/trophies.html');
    };

    WorkspaceController.prototype.bind = function(App) {
        var $el = $(this.el);

    };

    WorkspaceController.prototype.render = function(ctr, App, data) {

        var that = this;

        var awardedTrophies = {
            'awarded': {
                '5': 2,
                '1': 1,
                '20': 1,
                '3': 2,
                '10': 3
            }

        };

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

        }
        else{
            exp3 = true;
        }

        // Logic 3 : Show Rewarded and not Rewarded (Task Not Locked )

        that.el = document.createElement('div');
        that.el.className = 'smellOptInContainer animation_fadein noselect';
        that.el.innerHTML = Mustache.render(unescape(that.template), { experiment2: exp2, experiment3: exp3, trophiesData: data, awardedCount: Object.keys(awardedTrophies.awarded).length, totalCount: data.length });

        ctr.appendChild(that.el);
        events.publish('update.loader', { show: false });

        that.bind(App);
    };

    WorkspaceController.prototype.destroy = function() {

    };

    module.exports = WorkspaceController;

})(window, platformSdk, platformSdk.events);

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
            "awarded": {
                "0": 2,
                "1": 1,
                "2": 1,
                "3": 2,
                "4": 3
            }

        };

        if (data)
            for (var key in awardedTrophies.awarded) {
                data[key].awarded = "true";
                data[key].curLevel = awardedTrophies.awarded[key];
            }






        that.el = document.createElement('div');
        that.el.className = 'smellOptInContainer animation_fadein noselect';
        that.el.innerHTML = Mustache.render(unescape(that.template), { trophiesData: data, awardedCount: Object.keys(awardedTrophies.awarded).length, totalCount: data.length });

        ctr.appendChild(that.el);
        events.publish('update.loader', { show: false });


        that.bind(App);
    };

    WorkspaceController.prototype.destroy = function() {

    };

    module.exports = WorkspaceController;

})(window, platformSdk, platformSdk.events);
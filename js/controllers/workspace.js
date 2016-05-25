(function(W, platformSdk, events) {
    'use strict';

    var utils = require('../util/utils'),
        Constants = require('../../constants.js'),

        WorkspaceController = function(options) {
            this.template = require('raw!../../templates/workspace.html');
        };

    WorkspaceController.prototype.bind = function(App, data) {
        var $el = $(this.el);
        var logDataToSend = {};
        var btn = document.getElementsByClassName('homeScreenBtn')[0];

        btn.addEventListener('click', function() {

            logDataToSend.uk = "optin_clk";
            logDataToSend.c = "click";
            logDataToSend.o = "optin_clk";
            App.surveyServices.logData(logDataToSend);

            if (platformSdk.bridgeEnabled) {
                platformSdk.appData.helperData.ftueDone = true;
                platformSdk.appData.helperData.currentQuesNum = 1;
                platformSdk.appData.helperData.currentQuesId = 0;
                platformSdk.updateHelperData(platformSdk.appData.helperData);
                App.router.navigateTo('/takeSurvey');
            } else {
                App.router.navigateTo('/takeSurvey', data);
            }

        });
    };





    WorkspaceController.prototype.render = function(ctr, App, data) {

        var that = this;
        var firstScreen;

        if (platformSdk.bridgeEnabled)
            firstScreen = platformSdk.appData.helperData.firstScreen;
        else
            firstScreen = {
                "title": "Hike Survey",
                "subtitle": "You’ve been an awesome hiker and we highly value your feedback.",
                "CTAText": "COUNT ME IN",
                "bottomTitle": "2-3 min"
            };


        that.el = document.createElement('div');
        that.el.className = 'workSpaceContainer animation_fadein noselect';
        that.el.innerHTML = Mustache.render(unescape(that.template), { firstScreen: firstScreen });
        ctr.appendChild(that.el);
        events.publish('update.loader', { show: false });
        that.bind(App, data);
    };

    WorkspaceController.prototype.destroy = function() {

    };

    module.exports = WorkspaceController;


})(window, platformSdk, platformSdk.events);
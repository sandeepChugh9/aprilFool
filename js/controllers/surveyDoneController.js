(function(W, platformSdk, events) {
    'use strict';

    var utils = require('../util/utils'),
        Constants = require('../../constants.js'),

        SurveyDoneController = function(options) {
            this.template = require('raw!../../templates/surveyDone.html');
        };

    SurveyDoneController.prototype.bind = function(App, data) {
        var $el = $(this.el);
        var logDataToSend = {};
        var btn = document.getElementsByClassName('surveyDoneBtn')[0];

        logDataToSend.uk = "scrn_fnl_load";
        logDataToSend.c = "scrn_load";
        logDataToSend.o = "scrn_fnl";
        logDataToSend.g = btn.innerHTML;
        App.surveyServices.logData(logDataToSend);

        btn.addEventListener('click', function() {

            logDataToSend = {};
            logDataToSend.uk = "scrn_fnl_sbmt";
            logDataToSend.c = "click";
            logDataToSend.o = "scrn_fnl";
            logDataToSend.g = btn.innerHTML;
            App.surveyServices.logData(logDataToSend);

            if (platformSdk.bridgeEnabled)
                PlatformBridge.deleteBotConversation()
            else
                console.log('closing App');

        });


    };





    SurveyDoneController.prototype.render = function(ctr, App, data) {

        var that = this;
        var lastScreen;

        if (platformSdk.bridgeEnabled)
            lastScreen = platformSdk.appData.helperData.lastScreen;
        else
            lastScreen = {
                "title": "Well done!",
                "subtitle": "Thank you for making it this far.We’ llget back to your with some awesome stuff very soon.You have received 100 Rs.for performing this exemplary task.",
                "CTAText": "GOT IT"

            }

        that.el = document.createElement('div');
        that.el.className = 'surveyDoneContainer animation_fadein noselect';
        that.el.innerHTML = Mustache.render(unescape(that.template), { lastScreen: lastScreen });
        ctr.appendChild(that.el);
        events.publish('update.loader', { show: false });
        that.bind(App, data);
    };

    SurveyDoneController.prototype.destroy = function() {

    };

    module.exports = SurveyDoneController;


})(window, platformSdk, platformSdk.events);
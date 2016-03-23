(function(W, platformSdk, events) {
    'use strict';

    var utils = require('../util/utils');

    var attachAromaController = function(options) {
        this.template = require('raw!../../templates/attachAroma.html');
    };

    attachAromaController.prototype.bind = function(App, data) {
        var $el = $(this.el);

        var attachAromaButton = this.el.getElementsByClassName('attachAromaButton')[0];

        attachAromaButton.addEventListener('click', function(ev) {
            console.log("Smell Attached :: Sending Card Message");
            var card = {

                fwdObject: {
                    "ld": {
                        "hikeAromaMessage": platformSdk.appData.helperData.attachSmellMessage,
                        "hikeAromaBackground": "smellTemplate",
                        "aromaName": false
                    },
                    "hd": {},
                    "layoutId": "card.html",
                    "push": "silent",
                    "h": 200
                }
            };

            card.fwdObject.notifText = 'Hike Aroma';
            var hm = 'test card' + ' \n ' + "http://www.google.com";

            if (platformSdk.bridgeEnabled)
                PlatformBridge.forwardToChat(JSON.stringify(card.fwdObject), hm);

            //App.router.navigateTo( '/', {} );

        });


    };

    attachAromaController.prototype.render = function(ctr, App, data) {

        var that = this;

        that.el = document.createElement('div');
        that.el.className = 'attachAromaContainer animation_fadein noselect';
        that.el.innerHTML = Mustache.render(unescape(that.template), {});
        ctr.appendChild(that.el);
        events.publish('update.loader', { show: false });

        that.bind(App, data);
    };

    attachAromaController.prototype.destroy = function() {

    };

    module.exports = attachAromaController;

})(window, platformSdk, platformSdk.events);
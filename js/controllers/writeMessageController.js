(function(W, platformSdk, events) {
    'use strict';

    var utils = require('../util/utils');

    var writeMessageController = function(options) {
        this.template = require('raw!../../templates/writeMessage.html');
    };

    writeMessageController.prototype.bind = function(App) {
        var $el = $(this.el);

        var writeMessageButton = this.el.getElementsByClassName('writeMessageButton')[0];
        var aromaMessage = this.el.getElementsByClassName('aromaMessage')[0];
        var limitChar = platformSdk.appData.helperData.charLimit;
        var initialH = aromaMessage.scrollHeight;
        var messageToSend;

        aromaMessage.addEventListener('keydown', function(ev) {

            var outerHeight = parseInt(window.getComputedStyle(this).height, 10);
            var diff = outerHeight - this.clientHeight;

            this.style.height = 0;
            this.style.height = Math.max(initialH, this.scrollHeight + diff) + 'px';

            console.log(this.value.length);



            if (this.value.length <= limitChar)
                return true;


            this.value = this.value.substr(0, limitChar);
        });

        writeMessageButton.addEventListener('click', function(ev) {

            if (aromaMessage.value.length > 0) {
                messageToSend = aromaMessage.value;
                App.ValentineServices.logData({ 'et': 'afcustommessage' });
            } else {
                messageToSend = platformSdk.appData.helperData.defaultMessage;
                App.ValentineServices.logData({ 'et': 'afdefaultmessage' });
            }

            if (!platformSdk.appData.helperData.selectedSmellName) {
                platformSdk.appData.helperData.selectedSmellName = 'Custom Smell';
                platformSdk.updateHelperData(platformSdk.appData.helperData);
            }


            var card = {

                fwdObject: {
                    "ld": {
                        "hikeAromaMessage": messageToSend,
                        "hikeAromaBackground": platformSdk.appData.helperData.selectedSmellImg,
                        "aromaName": platformSdk.appData.helperData.selectedSmellName.toUpperCase()+' '+'SMELL'
                    },
                    "hd": {},
                    "layoutId": "card.html",
                    "push": "silent",
                    "notifText": "Hike Aroma recieved",
                    "h": 200
                }
            };


            card.fwdObject.notifText = 'Hike Aroma';
            var hm = 'A smell has been received - ' + ' ' + messageToSend + ' ' + "Note: Hike Smell works only on the latest version of Android.";

            if (platformSdk.bridgeEnabled)
                PlatformBridge.forwardToChat(JSON.stringify(card.fwdObject), hm);

        });

    };

    writeMessageController.prototype.render = function(ctr, App, data) {

        var that = this;

        try {
            PlatformBridge.changeBotTitle('Attach message');
        } catch (e) {
            console.log('Error in changing bot title');
        }


        that.el = document.createElement('div');
        that.el.className = 'writeMessageContainer animation_fadein noselect';
        that.el.innerHTML = Mustache.render(unescape(that.template), { defaultMessage: platformSdk.appData.helperData.defaultMessage });
        ctr.appendChild(that.el);
        events.publish('update.loader', { show: false });

        that.bind(App);
    };

    writeMessageController.prototype.destroy = function() {

    };

    module.exports = writeMessageController;

})(window, platformSdk, platformSdk.events);
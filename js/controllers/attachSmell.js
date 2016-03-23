(function(W, platformSdk, events) {
    'use strict';

    var utils = require('../util/utils');

    var AttachSmellController = function(options) {
        this.template = require('raw!../../templates/attachSmell.html');
    };

    AttachSmellController.prototype.bind = function(App, data) {
        var $el = $(this.el);

        platformSdk.appData.helperData.attachSmellMessage = data.hm;
        platformSdk.updateHelperData(platformSdk.appData.helperData);

        var smellIcon = document.getElementsByClassName('smellSection');
        var nextBtn = document.getElementsByClassName('btnContainer')[0];
        var captureSmell = document.getElementsByClassName('captureSmell')[0];
        var openCamera = document.getElementsByClassName('openCamera')[0];

        for (var n, i = 0; n = smellIcon.length, i < n; i++)
            smellIcon[i].addEventListener('click', highlightSmell, false);

        function highlightSmell() {
            removeSelection();
            this.classList.add('selectedStateSmell');
            captureSmell.classList.add('hide');
            nextBtn.classList.remove('hide');

        }

        function removeSelection() {
            var selectedStateSmellObjs = document.getElementsByClassName('selectedStateSmell');
            for (var k, l = 0; k = selectedStateSmellObjs.length, l < k; l++)
                selectedStateSmellObjs[l].classList.remove('selectedStateSmell');
        }


        // Forward the card object 
        nextBtn.addEventListener('click', function() {
            var card = {

                fwdObject: {
                    "ld": {
                        "hikeAromaMessage": platformSdk.appData.helperData.attachSmellMessage,
                        "hikeAromaBackground": "smellTemplate",
                        "isCamera":platformSdk.appData.helperData.isCamera
                    },
                    "hd": {},
                    "layoutId": "card.html",
                    "push": "silent",
                    "notifText": "Hike Aroma recieved",
                    "h": 200
                }
            };


            card.fwdObject.notifText = 'Hike Aroma';
            var hm = 'test card' + ' \n ' + "http://www.google.com";

            if (platformSdk.bridgeEnabled)
                PlatformBridge.forwardToChat(JSON.stringify(card.fwdObject), hm);

        });

        // Invoke the camera
        openCamera.addEventListener('click', function() {

            if (platformSdk.appData.helperData.attachSmellCalled) {
                platformSdk.appData.helperData.attachSmellCalled = 1;
                platformSdk.appData.helperData.isCamera = true;
            } else {
                platformSdk.appData.helperData.attachSmellCalled = 1;
                platformSdk.appData.helperData.isCamera = true;
            }
            platformSdk.updateHelperData(platformSdk.appData.helperData);

            events.publish('update.loader', { show: true });

            try {
                if (platformSdk.bridgeEnabled)
                    platformSdk.nativeReq({
                        ctx: self,
                        fn: 'chooseFile',
                        data: 'true',
                        success: function(res) {
                            console.log("Image Selected From The Gallery");
                            if (platformSdk.appData.helperData.attachSmellCalled) {
                                platformSdk.appData.helperData.attachSmellCalled = 0;
                                platformSdk.updateHelperData(platformSdk.appData.helperData);
                                console.log("Taking To detect Aroma");
                                // Detecting Aroma 
                                that.router.navigateTo('/detectAroma', {});
                                // Attaching Aroma Screen
                                setTimeout(function() {
                                    that.router.navigateTo('/attachAroma', {});
                                }, 5000);
                            }
                        }
                    });


            } catch (err) {
                if (platformSdk.bridgeEnabled)
                    platformSdk.ui.showToast('Error while capturing smell..');
            }


        });

    };

    AttachSmellController.prototype.render = function(ctr, App, data) {

        var that = this;
        that.el = document.createElement('div');
        that.el.className = 'animation_fadein noselect';
        that.el.innerHTML = Mustache.render(unescape(that.template));
        ctr.appendChild(that.el);
        events.publish('update.loader', { show: false });
        that.bind(App, data);
    };

    AttachSmellController.prototype.destroy = function() {

    };

    module.exports = AttachSmellController;

})(window, platformSdk, platformSdk.events);
(function(W, platformSdk, events) {
    'use strict';

    var utils = require('../util/utils');

    var AttachSmellController = function(options) {
        this.template = require('raw!../../templates/attachSmell.html');
    };

    AttachSmellController.prototype.bind = function(App) {
        var $el = $(this.el);

        var smellIcon = document.getElementsByClassName('smellSection');
        var nextBtn = document.getElementsByClassName('btnContainer')[0];
        var captureSmell = document.getElementsByClassName('captureSmell')[0];
        var openCamera = document.getElementsByClassName('openCamera')[0];

        for (var n, i = 0; n = smellIcon.length, i < n; i++)
            smellIcon[i].addEventListener('click', highlightSmell, false);



        function highlightSmell() {
            removeSelection();
            this.classList.add('selectedStateSmell')
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
                    "ld": {},
                    "hd": {},
                    "layoutId": "http://static.platform.hike.in/download/microapp/popup/someCard.zip ",
                    "push": "silent",
                    "notifText": "News Article",
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

            try {
                if (platformSdk.bridgeEnabled)
                    platformSdk.nativeReq({
                        ctx: self,
                        fn: 'chooseFile',
                        data: 'true',
                        success: function(res) {
                            //  App.router.navigateTo('/smellDetect', res)
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
        that.bind(App);
    };

    AttachSmellController.prototype.destroy = function() {

    };

    module.exports = AttachSmellController;

})(window, platformSdk, platformSdk.events);
(function(W, platformSdk, events) {
    'use strict';

    var utils = require('../util/utils');

    var AttachSmellController = function(options) {
        this.template = require('raw!../../templates/attachSmell.html');
    };

    AttachSmellController.prototype.bind = function(App, data) {
        var $el = $(this.el);



        var smellIcon = document.getElementsByClassName('smellSection'),
            nextBtn = document.getElementsByClassName('nextBtn')[0],
            cancelBtn = document.getElementsByClassName('cancelBtn')[0],
            captureSmell = document.getElementsByClassName('captureSmell')[0],
            openCamera = document.getElementsByClassName('openCamera')[0],
            selectedSmellName, selectedSmellImg;

        for (var n, i = 0; n = smellIcon.length, i < n; i++)
            smellIcon[i].addEventListener('click', highlightSmell, false);

        function highlightSmell() {
            removeSelection();
            this.classList.add('selectedStateSmell');
            captureSmell.classList.add('hide');
            nextBtn.classList.remove('hide');
            cancelBtn.classList.remove('hide');
            selectedSmellName = this.getAttribute('aromaName');
            selectedSmellImg = this.getAttribute('aromaImg');

            platformSdk.appData.helperData.selectedSmellName = selectedSmellName;
            platformSdk.appData.helperData.selectedSmellImg = selectedSmellImg;
            platformSdk.updateHelperData(platformSdk.appData.helperData);

        }

        function removeSelection() {
            var selectedStateSmellObjs = document.getElementsByClassName('selectedStateSmell');
            for (var k, l = 0; k = selectedStateSmellObjs.length, l < k; l++)
                selectedStateSmellObjs[l].classList.remove('selectedStateSmell');

            nextBtn.classList.add('hide');
            cancelBtn.classList.add('hide');
            captureSmell.classList.remove('hide');

        }

        cancelBtn.addEventListener('click', function() {
            removeSelection();
        });


        // Forward the card object 
        nextBtn.addEventListener('click', function() {
            App.router.navigateTo('/writeMessage', {});

        });

        // Invoke the camera
        openCamera.addEventListener('click', function() {

            if (platformSdk.appData.helperData.attachSmellCalled) {
                platformSdk.appData.helperData.attachSmellCalled = 1;
            } else {
                platformSdk.appData.helperData.attachSmellCalled = 1;
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
                    platformSdk.ui.showToast('Something went wrong. Please select a default smell.');
            }


        });

    };

    AttachSmellController.prototype.render = function(ctr, App, data) {

        var that = this;

        try {
            PlatformBridge.changeBotTitle('Attach smell');
        } catch (e) {
            console.log('Error in changing bot title');
        }


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
(function(W, platformSdk, events) {
    'use strict';

    var utils = require('../util/utils');

    var smellMessageController = function(options) {
        this.template = require('raw!../../templates/smellMessage.html');
    };

    smellMessageController.prototype.bind = function(App) {
        var $el = $(this.el);

        var trySmellButton = this.el.getElementsByClassName('trySmellButton')[0];
        var refreshText = this.el.getElementsByClassName('refreshText')[0];
        var refreshButton = this.el.getElementsByClassName('refreshButton')[0];
        var smellMessageIcon = this.el.getElementsByClassName('smellMessageIcon')[0];
        var foolIcon = this.el.getElementsByClassName('foolIcon')[0];
        var revealFlag = platformSdk.appData.helperData.revealFlag;
        var tries = 0;
        var currArr;

        var revealArr = platformSdk.appData.helperData.revealArr.slice();
        var noRevealArr = platformSdk.appData.helperData.noRevealArr.slice();



        // Animation Stop and Show Refresh Classes
        setTimeout(function() {

            if (revealFlag) {
                refreshText.innerHTML = revealArr[0];
                revealArr.shift();
            } else {
                refreshText.innerHTML = noRevealArr[0];
                noRevealArr.shift();
            }
            smellMessageIcon.style.WebkitAnimationPlayState = "paused";
            refreshText.classList.remove('hide');
            refreshButton.classList.remove('hide');
            trySmellButton.classList.remove('hide');
        }, 4000);



        refreshButton.addEventListener('click', function(ev) {

            smellMessageIcon.style.WebkitAnimationPlayState = "running";
            refreshButton.classList.add('hide');
            refreshText.classList.add('hide');
            trySmellButton.classList.add('hide');

            if (revealFlag)
                App.ValentineServices.logData({ 'et': 'afrefreshclickRevealFlow' });
            else
                App.ValentineServices.logData({ 'et': 'afrefreshclickNoRevealFlow' });



            setTimeout(function() {
                smellMessageIcon.style.WebkitAnimationPlayState = "paused";

                if (revealFlag)
                    currArr = revealArr;
                else
                    currArr = noRevealArr;

                if (currArr.length > 1)
                    refreshButton.classList.remove('hide');
                else if (revealFlag) {
                    trySmellButton.innerHTML = "FOOL YOUR FRIENDS NOW";
                    refreshText.classList.add('trollText');
                    smellMessageIcon.remove();
                    foolIcon.classList.remove('hide');

                }

                refreshText.innerHTML = currArr[0];
                if (revealFlag)
                    revealArr.shift();
                else
                    noRevealArr.shift();

                refreshText.classList.remove('hide');
                trySmellButton.classList.remove('hide');


            }, 4000);








        });

        trySmellButton.addEventListener('click', function(ev) {
            // Write Message Input Router Here

            if (trySmellButton.innerHTML === "FOOL YOUR FRIENDS NOW")
                App.ValentineServices.logData({ 'et': 'affoolfriendsclick' });
            else {
                if (revealFlag)
                    App.ValentineServices.logData({ 'et': 'aftryhikesmellRevealflowclick' });
                else
                    App.ValentineServices.logData({ 'et': 'aftryhikesmellNorevealflowclick' });
            }
            console.log("Take To Home Screen Of Hike Aroma To Try The User");

            if(platformSdk.appData.helperData.ftueDone){
                App.router.navigateTo('/attachSmell');
            }else{
                App.router.navigateTo('/'); 
            }
        });


    };

    smellMessageController.prototype.render = function(ctr, App, data) {

        var that = this;

        try {
            PlatformBridge.changeBotTitle('Hike Smell');
        } catch (e) {
            console.log('Error in changing bot title');
        }

        that.el = document.createElement('div');
        that.el.className = 'smellMessageContainer animation_fadein noselect';
        that.el.innerHTML = Mustache.render(unescape(that.template), {});
        ctr.appendChild(that.el);
        events.publish('update.loader', { show: false });

        that.bind(App);
    };

    smellMessageController.prototype.destroy = function() {

    };

    module.exports = smellMessageController;

})(window, platformSdk, platformSdk.events);
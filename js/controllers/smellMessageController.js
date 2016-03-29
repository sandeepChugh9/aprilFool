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
        var maxTries = platformSdk.appData.helperData.totalTries;
        var tries = 0;

        // Animation Stop and Show Refresh Classes
        setTimeout(function() {
            smellMessageIcon.style.WebkitAnimationPlayState = "paused";
            refreshText.classList.remove('hide');
            refreshButton.classList.remove('hide');
        }, 4000);

        refreshButton.addEventListener('click', function(ev) {



            /* // Date Defination
             var foolDate = new Date('04-02-2016 00:00:00');
             var currDate = new Date();

             // Write Message Input Router Here
             console.log("Run smell Animation Again");
             smellMessageIcon.style.WebkitAnimationPlayState = "running";

             refreshText.classList.add('hide');
             refreshButton.classList.add('hide');

             // If true Then revealed on april 2 else only revealing at refresh

             if (platformSdk.appData.helperData.flowReveal) {
                 if (foolDate <= currDate) {
                     console.log("Reveal April Fool");
                     smellMessageIcon.remove();
                     foolIcon.classList.remove('hide');
                     refreshText.innerHTML = 'Share aroma and prank your friends this april fool';
                     refreshText.classList.add('changePadding');
                     refreshText.classList.remove('hide');
                     trySmellButton.classList.remove('hide');
                 } else {
                     console.log("Dont Reveal April Fool :: until the date");
                     trySmellButton.classList.remove('hide');
                 }
             } else {
                 console.log("As soon as refresh is clicked :: Katta Sticker Comes");
                 smellMessageIcon.remove();
                 foolIcon.classList.remove('hide');
                 refreshText.innerHTML = 'Share aroma and prank your friends this april fool';
                 refreshText.classList.add('changePadding');
                 refreshText.classList.remove('hide');
                 trySmellButton.classList.remove('hide');
             }*/
            if (tries < maxTries) {
                tries++;
                smellMessageIcon.style.WebkitAnimationPlayState = "running";
                refreshText.classList.add('hide');
                refreshButton.classList.add('hide');
                setTimeout(function() {
                    smellMessageIcon.style.WebkitAnimationPlayState = "paused";
                    refreshText.classList.remove('hide');
                    refreshButton.classList.remove('hide');
                }, 4000);
            } else {
                smellMessageIcon.remove();
                foolIcon.classList.remove('hide');
                refreshText.innerHTML = 'Share aroma and prank your friends this april fool';
                refreshText.classList.add('changePadding');
                refreshText.classList.remove('hide');
                trySmellButton.classList.remove('hide');

            }

        });

        trySmellButton.addEventListener('click', function(ev) {
            // Write Message Input Router Here
            console.log("Take To Home Screen Of Hike Aroma To Try The User");
            App.router.navigateTo('/', {});
        });


    };

    smellMessageController.prototype.render = function(ctr, App, data) {

        var that = this;

        try{
             PlatformBridge.changeBotTitle('Hike Smell');
        }
        catch(e){
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
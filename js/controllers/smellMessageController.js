(function(W, platformSdk, events) {
    'use strict';

    var utils = require('../util/utils');

    var smellMessageController = function(options) {
        this.template = require('raw!../../templates/smellMessage.html');
    };

    smellMessageController.prototype.bind = function(App) {
        var $el = $(this.el);

        var trySmellButton = this.el.getElementsByClassName( 'trySmellButton' )[0];
        var refreshText = this.el.getElementsByClassName('refreshText')[0];
        var refreshButton = this.el.getElementsByClassName('refreshButton')[0];
        var smellMessageIcon = this.el.getElementsByClassName('smellMessageIcon')[0];
        
        // Animation Stop and Show Refresh Classes
        setTimeout(function(){
            smellMessageIcon.style.WebkitAnimationPlayState = "paused";
            refreshText.classList.remove('hide');
            refreshButton.classList.remove('hide');
         }, 5000);

        refreshButton.addEventListener('click', function(ev) {
            // Write Message Input Router Here
            console.log("Run smell Animation Again");
            smellMessageIcon.style.WebkitAnimationPlayState = "running";
            refreshText.classList.add('hide');
            refreshButton.classList.add('hide');
            //App.router.navigateTo( '/', {} );
        });

        trySmellButton.addEventListener('click', function(ev) {
            // Write Message Input Router Here
            console.log("Take To Home Screen Of Hike Aroma To Try The User");
            App.router.navigateTo( '/', {} );
        });


    };

    smellMessageController.prototype.render = function(ctr, App, data) {

        var that = this;

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
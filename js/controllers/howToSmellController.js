(function(W, platformSdk, events) {
    'use strict';

    var utils = require('../util/utils');

    var howToSmellController = function(options) {
        this.template = require('raw!../../templates/howToSmell.html');
    };

    howToSmellController.prototype.bind = function(App) {
        var $el = $(this.el);

        var howToSmellButton = this.el.getElementsByClassName('howToSmellButton')[0];

        howToSmellButton.addEventListener('click', function(ev) {
            // Write Message Input Router Here
            console.log("Getting your Message Aroma");
            App.ValentineServices.logData({ 'et': 'afsmellnowclick' });
            App.router.navigateTo('/smellMessage', {});
        });

    };

    howToSmellController.prototype.render = function(ctr, App, data) {

        var that = this;

        try {
            PlatformBridge.changeBotTitle('Hike Smell');
        } catch (e) {
            console.log('Error in changing bot title');
        }

        that.el = document.createElement('div');
        that.el.className = 'howToSmellContainer animation_fadein noselect';
        that.el.innerHTML = Mustache.render(unescape(that.template), {});
        ctr.appendChild(that.el);
        events.publish('update.loader', { show: false });

        that.bind(App);
    };

    howToSmellController.prototype.destroy = function() {

    };

    module.exports = howToSmellController;

})(window, platformSdk, platformSdk.events);
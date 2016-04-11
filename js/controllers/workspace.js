(function(W, platformSdk, events) {
    'use strict';

    var utils = require('../util/utils');

    var WorkspaceController = function(options) {
        this.template = require('raw!../../templates/workspace.html');
    };

    WorkspaceController.prototype.bind = function(App) {
        var $el = $(this.el);

        // var smellButton = this.el.getElementsByClassName('smellButtonHome')[0];

        // smellButton.addEventListener('click', function(ev) {
        //     // Write Message Input Router Here

        //     App.ValentineServices.logData({ 'et': 'afsmellsubscribe' });
        //     console.log("Moving To AttachSmell router");
        //     App.router.navigateTo('/attachSmell', {});

        //     platformSdk.appData.helperData.ftueDone = 1;
        //     platformSdk.updateHelperData(platformSdk.appData.helperData);

        // });
    };

    WorkspaceController.prototype.render = function(ctr, App, data) {

        var that = this;

        // try {
        //     PlatformBridge.changeBotTitle('Hike Smell');
        // } catch (e) {
        //     console.log('Error in changing bot title');
        // }

        that.el = document.createElement('div');
        that.el.className = 'smellOptInContainer animation_fadein noselect';
        that.el.innerHTML = Mustache.render(unescape(that.template), {});

        ctr.appendChild(that.el);
        events.publish('update.loader', { show: false });


        that.bind(App);
    };

    WorkspaceController.prototype.destroy = function() {

    };

    module.exports = WorkspaceController;

})(window, platformSdk, platformSdk.events);
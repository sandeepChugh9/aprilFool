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
            platformSdk.appData.helperData.selectedSmellName = false;
            platformSdk.appData.helperData.selectedSmellImg = platformSdk.appData.helperData.defaultImg;
            platformSdk.updateHelperData(platformSdk.appData.helperData);
            App.router.navigateTo('/writeMessage', {});
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
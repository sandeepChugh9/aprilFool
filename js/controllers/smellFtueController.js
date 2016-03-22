(function(W, platformSdk, events) {
    'use strict';

    var utils = require('../util/utils');

    var smellFtueController = function(options) {
        this.template = require('raw!../../templates/smellFtue.html');
    };

    smellFtueController.prototype.bind = function(App) {
        var $el = $(this.el);

    };

    smellFtueController.prototype.render = function(ctr, App, data) {

        var that = this;

        that.el = document.createElement('div');
        that.el.className = 'animation_fadein noselect';
        that.el.innerHTML = Mustache.render(unescape(that.template), {});
        ctr.appendChild(that.el);
        events.publish('update.loader', { show: false });

        that.bind(App);
    };

    smellFtueController.prototype.destroy = function() {

    };

    module.exports = smellFtueController;

})(window, platformSdk, platformSdk.events);
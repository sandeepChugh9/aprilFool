(function(W, platformSdk, events) {
    'use strict';

    var utils = require('../util/utils');

    var AttachSmellController = function(options) {
        this.template = require('raw!../../templates/attachSmell.html');
    };

    AttachSmellController.prototype.bind = function(App) {
        var $el = $(this.el);


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
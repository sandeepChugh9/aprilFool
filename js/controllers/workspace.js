(function(W, platformSdk, events) {
    'use strict';

    var utils = require('../util/utils');

    var WorkspaceController = function(options) {
        this.template = require('raw!../../templates/workspace.html');
    };

    WorkspaceController.prototype.bind = function(App) {
        var $el = $(this.el);

        valentineSubscribe.addEventListener('click', function(ev) {
            events.publish('update.loader', { show: true });

            // Subscribe The User Here       
            if (platformSdk.bridgeEnabled) {






            }
        });


        homebutton.addEventListener('click', function(ev) {

        });

        TandC.addEventListener('click', function(ev) {

        });

    };

    WorkspaceController.prototype.render = function(ctr, App, data) {

        var that = this;

        that.el = document.createElement('div');
        that.el.className = 'animation_fadein noselect';




        that.el.innerHTML = Mustache.render(unescape(that.template), { subscribeScreen: "test" });
        ctr.appendChild(that.el);
        events.publish('update.loader', { show: false });


        that.bind(App);
    };

    WorkspaceController.prototype.destroy = function() {

    };

    module.exports = WorkspaceController;

})(window, platformSdk, platformSdk.events);
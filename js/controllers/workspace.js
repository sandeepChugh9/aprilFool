(function(W, platformSdk, events) {
    'use strict';

    var utils = require('../util/utils'),
        Constants = require('../../constants.js'),

        TrophiesController = function(options) {
            this.template = require('raw!../../templates/workspace.html');
        };

    TrophiesController.prototype.bind = function(App) {
        var $el = $(this.el);

        var btn = document.getElementById('btnAction');

        btn.addEventListener('click', function(ev) {
            App.router.navigateTo('/trophies', Constants.TROPHIES);
        });



    };

    TrophiesController.prototype.render = function(ctr, App, data) {

        var that = this;

        that.el = document.createElement('div');
        that.el.className = 'workSpaceContainer animation_fadein noselect';
        that.el.innerHTML = Mustache.render(unescape(that.template), { userData: data });
        ctr.appendChild(that.el);
        events.publish('update.loader', { show: false });


        try {
            PlatformBridge.changeBotTitle( 'Stats' );
        } catch ( e ) {
            console.log( 'Error in changing bot title' );
        }

        that.bind(App);
    };

    TrophiesController.prototype.destroy = function() {

    };

    module.exports = TrophiesController;

})(window, platformSdk, platformSdk.events);
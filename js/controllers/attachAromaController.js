(function(W, platformSdk, events) {
    'use strict';

    var utils = require('../util/utils');

    var attachAromaController = function(options) {
        this.template = require('raw!../../templates/attachAroma.html');
    };

    attachAromaController.prototype.bind = function(App) {
        var $el = $(this.el);

        var attachAromaButton = this.el.getElementsByClassName( 'attachAromaButton' )[0];
    
        attachAromaButton.addEventListener('click', function(ev) {
            // Write Message Input Router Here
            console.log("Smell Attached :: Sending Card Message");
            //App.router.navigateTo( '/', {} );
        });


    };

    attachAromaController.prototype.render = function(ctr, App, data) {

        var that = this;

        that.el = document.createElement('div');
        that.el.className = 'attachAromaContainer animation_fadein noselect';
        that.el.innerHTML = Mustache.render(unescape(that.template), {});
        ctr.appendChild(that.el);
        events.publish('update.loader', { show: false });

        that.bind(App);
    };

    attachAromaController.prototype.destroy = function() {

    };

    module.exports = attachAromaController;

})(window, platformSdk, platformSdk.events);
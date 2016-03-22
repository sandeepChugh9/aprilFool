(function(W, platformSdk, events) {
    'use strict';

    var utils = require('../util/utils');

    var writeMessageController = function(options) {
        this.template = require('raw!../../templates/writeMessage.html');
    };

    writeMessageController.prototype.bind = function(App) {
        var $el = $(this.el);

        var writeMessageButton = this.el.getElementsByClassName('writeMessageButton')[0];
        var aromaMessage = this.el.getElementsByClassName('aromaMessage')[0];

        aromaMessage.addEventListener('keyup', function(ev) {
            console.log(this.value.length);
            if (this.value.length === 0) {
                writeMessageButton.classList.add('hide');
            } else {
                writeMessageButton.classList.remove('hide');
            }
        });

        writeMessageButton.addEventListener('click', function(ev) {
            // Write Message Input Router Here
            if (aromaMessage.value.length === 0) {
                console.log("Please Enter a Message To Proceed");
                platformSdk.ui.showToast('Please enter a message');
            } else {
                console.log(aromaMessage.value);
                console.log("Send the value forward to select the smell");
                App.router.navigateTo('/attachSmell', {hm:aromaMessage.value});
            }
        });

    };

    writeMessageController.prototype.render = function(ctr, App, data) {

        var that = this;

        that.el = document.createElement('div');
        that.el.className = 'writeMessageContainer animation_fadein noselect';
        that.el.innerHTML = Mustache.render(unescape(that.template), {});
        ctr.appendChild(that.el);
        events.publish('update.loader', { show: false });

        that.bind(App);
    };

    writeMessageController.prototype.destroy = function() {

    };

    module.exports = writeMessageController;

})(window, platformSdk, platformSdk.events);
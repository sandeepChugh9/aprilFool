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

        if (platformSdk.bridgeEnabled) {
            App.ninjaServices.getHikeStats(function(res) {
                console.log(res);
                if (res.stat == 'success') {
                    console.log('getHikeStats success');


                } else if (res.stat == 'fail') {


                } else {

                    platformSdk.ui.showToast('Hmm. Something went wrong. Not to worry, try again in a little bit :)');
                }
            });


            App.ninjaServices.getTrophyData(function(res) {
                console.log(res);
                if (res.stat == 'success') {
                    console.log('getTrophyData success');


                } else if (res.stat == 'fail') {


                } else {

                    platformSdk.ui.showToast('Hmm. Something went wrong. Not to worry, try again in a little bit :)');
                }
            });





        } else {
            var statsData = {};
            statsData.name = "Sandeep Chugh";
            statsData.age = "12/Jan/2015";
            statsData.dp = "";


            statsData.messages = {
                sent: "100K",
                rec: "10K"
            }

            statsData.stickers = {
                sent: "100K",
                rec: "10K"
            }


            statsData.files = {
                sent: "100",
                rec: "10"
            }

            statsData.dataTr = {
                sent: "100 MB",
                rec: "10 MB"
            }


            statsData.favorite = "23";

            var trophyData = {
                'awarded': {
                    '5': 2,
                    '1': 1,
                    '20': 1,
                    '3': 2,
                    '10': 3
                }

            };
        }



        that.el = document.createElement('div');
        that.el.className = 'workSpaceContainer animation_fadein noselect';
        that.el.innerHTML = Mustache.render(unescape(that.template), { statsData: statsData, trophyData: trophyData, awardedCount: Object.keys(trophyData.awarded).length });
        ctr.appendChild(that.el);
        events.publish('update.loader', { show: false });


        that.bind(App);
    };

    TrophiesController.prototype.destroy = function() {

    };

    module.exports = TrophiesController;

})(window, platformSdk, platformSdk.events);
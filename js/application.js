(function(W, events) {
    'use strict';

    var WorkspaceController = require('./controllers/workspace'),
        TrophiesController = require('./controllers/trophiesController'),

        Router = require('./util/router'),
        utils = require('./util/utils'),

        TxService = require('./util/txServices'),
        NinjaServices = require('./util/ninjaServices');

    // Full Screen Loader
    var loader = document.getElementById('loader');
    var loadObject = events.subscribe('update.loader', function(params) {
        loader.toggleClass('loading', params.show);
    });

    // Router Navigates To Home Page In The Start
    var APIData = {};
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var firstDate = new Date(1449858600000);
    var secondDate = new Date();
    var diffDays;

    // Tap State Events :: Touch Start And Touch End

    document.addEventListener('touchstart', function(e) {
        e = e || window.event;
        var target = e.target;
        if (target.classList.contains('buttonTap')) {
            target.classList.add('tapState');
        } else if (target.classList.contains('buttonTapRed')) {
            target.classList.add('tapStateRed');
        } else if (target.classList.contains('buttonTapOffer')) {
            target.classList.add('tapStateOffer');
        } else {
            return;
        }
    }, false);

    document.addEventListener('touchend', function(e) {
        e = e || window.event;
        var target = e.target;
        if (target.classList.contains('buttonTap')) {
            target.classList.remove('tapState');
        } else if (target.classList.contains('buttonTapRed')) {
            target.classList.remove('tapStateRed');
        } else if (target.classList.contains('buttonTapOffer')) {
            target.classList.remove('tapStateOffer');
        } else {
            return;
        }
    }, false);

    // Block Connection Tab
    var isBlock = document.getElementById('blockScreen');
    var isBlockObject = events.subscribe('app/block', function(params) {
        isBlock.toggleClass('block-msg', params.show);
    });

    var unBlockApp = function() {
        var self = this;
        var id = '' + platformSdk.retrieveId('app.menu.om.block');

        platformSdk.appData.block = 'false';
        if (platformSdk.bridgeEnabled) platformSdk.unblockChatThread();
        platformSdk.events.publish('app.state.block.hide');
        platformSdk.updateOverflowMenu(id, {
            'title': 'Block'
        });

        //utils.toggleBackNavigation( false );
        events.publish('update.loader', {
            show: false
        });
        events.publish('app/block', {
            show: false
        });
    };

    var Application = function(options) {
        this.container = options.container;
        this.routeIntent = options.route;

        this.router = new Router();

        this.workspaceController = new WorkspaceController();
        this.trophiesController = new TrophiesController();

        this.TxService = new TxService();
        this.ninjaServices = new NinjaServices(this.TxService); //communication layer
    };

    Application.prototype = {

        // Three Dot Menu Overflow Events Subscriptions
        OverflowEvents: function() {

            var that = this;

            // Notifications ON/OFF
            platformSdk.events.subscribe('app.menu.om.mute', function(id) {
                id = '' + platformSdk.retrieveId('app.menu.om.mute');

                if (platformSdk.appData.mute == 'true') {
                    platformSdk.appData.mute = 'false';
                    platformSdk.muteChatThread();
                    platformSdk.updateOverflowMenu(id, {
                        'is_checked': 'true'
                    });
                } else {
                    platformSdk.appData.mute = 'true';
                    platformSdk.muteChatThread();
                    platformSdk.updateOverflowMenu(id, {
                        'is_checked': 'false'
                    });
                }
            });

            // Block Event From The Three Dot
            platformSdk.events.subscribe('app.menu.om.block', function(id) {
                id = '' + platformSdk.retrieveId('app.menu.om.block');
                if (platformSdk.appData.block === 'true') {
                    unBlockApp();

                } else {
                    platformSdk.appData.block = 'true';
                    platformSdk.blockChatThread();
                    platformSdk.events.publish('app.state.block.show');
                    platformSdk.updateOverflowMenu(id, {
                        'title': 'Unblock'
                    });
                    utils.toggleBackNavigation(false);
                    events.publish('app/block', {
                        show: true
                    });
                    events.publish('app/offline', {
                        show: false
                    });

                }
            });
        },

        // Setting Up The Three Dot Menu
        initOverflowMenu: function() {

            var that = this;

            var omList = [{
                    'title': 'Notifications',
                    'en': 'true',
                    'eventName': 'app.menu.om.mute',
                    'is_checked': platformSdk.appData.mute === 'true' ? 'false' : 'true'
                },

                {
                    'title': platformSdk.appData.block === 'true' ? 'Unblock' : 'Block',
                    'en': 'true',
                    'eventName': 'app.menu.om.block'
                }
            ];

            that.OverflowEvents();

            platformSdk.setOverflowMenu(omList);
        },

        // If card Data Comes From Any Forwarded Card that calls Open Non Messaging Bot Here
        getIntentData: function(data) {
            var that = this;
            console.log(data);
            data = decodeURIComponent(data);
            data = JSON.parse(data);

        },

        getNumberAbrr: function(value) {
            var newValue = value;
            if (value >= 1000) {
                var suffixes = ['', 'K', 'M', 'B', 'T'];
                var suffixNum = Math.floor(('' + value).length / 3);
                var shortValue = '';
                var shortNum;
                for (var precision = 2; precision >= 1; precision--) {
                    shortValue = parseFloat((suffixNum !== 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(precision));
                    var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
                    if (dotLessShortValue.length <= 2) {
                        break;
                    }
                }
                if (shortValue % 1 !== 0) shortNum = shortValue.toFixed(1);
                newValue = shortValue + suffixes[suffixNum];
            }
            return newValue;
        },

        bytesToSize: function(bytes) {
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (bytes === 0) return '0';
            var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
            return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
        },

        formatData: function() {
            for (var key in APIData.statsData) {

                if (key == "hdFileTr") {
                    var sent = this.bytesToSize(APIData.statsData[key].sent).split(' ');
                    var rec = this.bytesToSize(APIData.statsData[key].rec).split(' ');

                    APIData.statsData[key].sent = Math.floor(sent[0]);
                    APIData.statsData[key].sentMetric = sent[1];
                    APIData.statsData[key].rec = Math.floor(rec[0]);
                    APIData.statsData[key].recMetric = rec[1];

                } else {
                    if (typeof APIData.statsData[key].sent != 'undefined')
                        APIData.statsData[key].sent = this.getNumberAbrr(APIData.statsData[key].sent);

                    if (typeof APIData.statsData[key].rec != 'undefined')
                        APIData.statsData[key].rec = this.getNumberAbrr(APIData.statsData[key].rec);

                    if (typeof APIData.statsData[key].count != 'undefined')
                        APIData.statsData[key].count = this.getNumberAbrr(APIData.statsData[key].count);

                }
            }
        },

        backPressTrigger: function() {

            var dialogElement = document.getElementsByClassName('trophyOverlay')[0];
            var dialogElement2 = document.getElementsByClassName('topTagOverlay')[0];

            if (dialogElement && !dialogElement.classList.contains('hide')) {
                dialogElement.classList.add('hide');
                return;
            } else if (dialogElement2 && !dialogElement2.classList.contains('hide')) {
                dialogElement2.classList.add('hide');
                return;
            }

            this.router.back();
        },

        resumeHikeNinja: function() {
            console.log('The Micro App Has Benn Resumed');
        },

        getRoute: function() {
            var that = this;

            // ToDo: Remvove this if block from here?
            if (this.routeIntent !== undefined) {

            } else {
                events.publish('app.store.get', {
                    key: '_routerCache',
                    ctx: this,
                    cb: function(r) {
                        if (r.status === 1 && platformSdk.bridgeEnabled) {
                            try {
                                that.router.navigateTo(r.results.route, r.results.cache);
                            } catch (e) {
                                that.router.navigateTo('/');
                            }
                        } else {
                            that.router.navigateTo('/');
                        }
                    }
                });
            }
        },

        getHikeStats: function() {

            var that = this;

            // Calling Hike Statistics After Getting the Hike Profile
            if (!platformSdk.appData.helperData.statsData) {
                this.ninjaServices.getHikeStats(function(res) {
                    console.log(res);
                    if (res.stat == 'ok') {
                        console.log('Hike Stats have been recieved for the user');
                        APIData.statsData = res;
                        console.log('New user with:', APIData);
                        platformSdk.appData.helperData.statsData = res;
                        platformSdk.updateHelperData(platformSdk.appData.helperData);
                        that.formatData();
                        this.router.navigateTo('/', APIData);
                    } else {
                        platformSdk.ui.showToast('Hmm. Something went wrong. Not to worry, try again in a little bit :)');
                    }
                });
            } else {
                console.log('Returning user with:', APIData);
                APIData.statsData = platformSdk.appData.helperData.statsData;
                that.formatData();
                this.router.navigateTo('/', APIData);
            }
        },

        daysConvertor: function(diff) {

            // The string we're working with to create the representation
            var str = '';

            // Map lengths of `diff` to different time periods
            var values = [
                [' year', 365],
                [' month', 30],
                [' day', 1]
            ];

            // Iterate over the values...
            for (var i = 0; i < values.length; i++) {
                var amount = Math.floor(diff / values[i][1]);

                // ... and find the largest time value that fits into the diff
                if (amount >= 1) {

                    // If we match, add to the string ('s' is for pluralization)
                    str += amount + values[i][0] + (amount > 1 ? 's' : '') + ' ';

                    // and subtract from the diff
                    diff -= amount * values[i][1];
                }
            }

            return str;

        },

        start: function() {

            var self = this;
            self.$el = $(this.container);

            self.initOverflowMenu();

            utils.toggleBackNavigation(false);
            document.querySelector('.unblockButton').addEventListener('click', function() {
                unBlockApp();
            }, false);

            // No Internet Connection Tab
            var noInternet = document.getElementById('nointernet');
            var noInternetObject = events.subscribe('app/offline', function(params) {
                noInternet.toggleClass('no-internet-msg', params.show);

            });

            platformSdk.events.subscribe('onBackPressed', function() {
                self.backPressTrigger();
            });

            platformSdk.events.subscribe('onUpPressed', function() {
                self.backPressTrigger();
            });

            // Subscribe :: Home Screen Aroma
            this.router.route('/', function(data) {
                self.container.innerHTML = '';
                self.workspaceController.render(self.container, self, data);
                utils.toggleBackNavigation(false);
            });

            // Subscribe :: Home Screen Aroma
            this.router.route('/trophies', function(data) {
                self.container.innerHTML = '';
                self.trophiesController.render(self.container, self, data);
                utils.toggleBackNavigation(true);
            });

            if (platformSdk.bridgeEnabled) {

                if (!platformSdk.appData.helperData.profileData) {

                    this.ninjaServices.getProfile(function(res) {
                        console.log(res);
                        if (res.stat == 'ok') {
                            console.log('Profile Data arrived');

                            res.first_reg_time = parseInt(res.first_reg_time);
                            firstDate = new Date(res.first_reg_time * 1000);
                            diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));

                            //res.age = diffDays;

                            if (diffDays === 0) {
                                res.age = '1 day';
                            } else {
                                res.age = self.daysConvertor(diffDays);
                            }

                            if (res.gender === '' || typeof res.gender === 'undefined')
                                res.gender = 'neutral';
                            APIData.profileData = res;

                            //Save the data in Helper data/Cache
                            platformSdk.appData.helperData.profileData = res;
                            platformSdk.updateHelperData(platformSdk.appData.helperData);
                            self.getHikeStats();

                        } else {
                            platformSdk.ui.showToast('Hmm. Something went wrong. Not to worry, try again in a little bit :)');
                        }
                    });
                } else {
                    var user_first_reg_time = parseInt(platformSdk.appData.helperData.profileData.first_reg_time);
                    firstDate = new Date(user_first_reg_time * 1000);
                    diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));

                    var temp = null;

                    if (diffDays === 0) {
                        temp = '1 day';
                    } else {
                        temp = self.daysConvertor(diffDays);
                    }

                    console.log('Updating Hike Age For the user');
                    console.log(temp);

                    platformSdk.appData.helperData.profileData.age = temp;
                    platformSdk.updateHelperData(platformSdk.appData.helperData);

                    APIData.profileData = platformSdk.appData.helperData.profileData;
                    self.getHikeStats();
                }

                // Chrome Dev Using STUB Data For Hike

            } else {

                diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));

                APIData.profileData = {
                    name: 'Sandeep Chugh',
                    age: diffDays,
                    icon: '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',
                    gender: 'm'
                };

                APIData.statsData = {

                    'messages': {
                        'sent': '1000',
                        'rec': '1000000',
                        'top': '2',
                        'level': '1'
                    },

                    'stickers': {
                        'sent': '1000000',
                        'rec': '1000000',
                        'top': '2',
                        'level': '1'
                    },

                    'files': {
                        'sent': '1000000',
                        'rec': '1000000',
                        'top': '2',
                        'level': '1'
                    },

                    "chatThemes": {
                        "sent": "100000000",
                        "rec": "100",
                        "top": "2",
                        "level": "1"

                    },

                    "hdFileTr": {
                        "sent": "230000000",
                        "rec": "45002",
                        "top": "2",
                        "level": "3"
                    },

                    'favorite': {
                        'count': '200',
                        'top': '2',
                        'level': '2'
                    },

                    'statusUpdates': {
                        'count': '2',
                        'top': '2',
                        'level': '3'
                    },

                    'invites': {
                        'count': '2',
                        'top': '2',
                        'level': '3'
                    },

                    'trophyCount': '5',
                    'hikeLatestVersion': '4.2.5.82'
                };

                this.formatData();
                self.router.navigateTo('/', APIData);
            }




        }
    };

    module.exports = Application;

})(window, platformSdk.events);
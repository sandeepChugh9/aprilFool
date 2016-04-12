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

        backPressTrigger: function() {
            this.router.back();
        },

        resumeHikeNinja: function() {
            console.log("The Micro App Has Benn Resumed");
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
                utils.toggleBackNavigation(false);
            });



            // Router Navigates To Home Page In The Start    
            self.router.navigateTo('/');

        }
    };

    module.exports = Application;

})(window, platformSdk.events);
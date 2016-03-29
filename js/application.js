(function(W, events) {
    'use strict';

    var WorkspaceController = require('./controllers/workspace'),
        SmellFtueController = require('./controllers/smellFtueController'),
        HowToSmellController = require('./controllers/howToSmellController'),
        SmellMessageController = require('./controllers/smellMessageController'),
        AttachAromaController = require('./controllers/attachAromaController'),
        DetectAromaController = require('./controllers/detectAromaController'),
        WriteMessageController = require('./controllers/writeMessageController'),
        AttachSmellController = require('./controllers/attachSmell'),

        Router = require('./util/router'),
        utils = require('./util/utils'),

        TxService = require('./util/txServices'),
        ValentineServices = require('./util/valentineServices');

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
        this.howToSmellController = new HowToSmellController();
        this.smellMessageController = new SmellMessageController();
        this.smellFtueController = new SmellFtueController();
        this.attachAromaController = new AttachAromaController();
        this.detectAromaController = new DetectAromaController();
        this.writeMessageController = new WriteMessageController();
        this.attachSmellController = new AttachSmellController();


        this.TxService = new TxService();
        this.ValentineServices = new ValentineServices(this.TxService); //communication layer
    };

    Application.prototype = {

        // Setting Up The Three Dot Menu
        initOverflowMenu: function() {

            var that = this;

            var omList = [{
                "title": "How it works",
                "en": "true",
                "eventName": "app.menu.om.how"
            }];

            // FAQ Event From Three Dot
            platformSdk.events.subscribe('app.menu.om.how', function(id) {
                //that.ValentineServices.logData({ 'ek': 'hvFaq' });
                that.ValentineServices.logData({ 'et': 'affaqopen' });
                that.router.navigateTo('/smellFtue', {});
            });

            // Notifications
            // platformSdk.events.subscribe('app.menu.om.mute', function(id) {
            //     id = "" + platformSdk.retrieveId('app.menu.om.mute');
            //     if (platformSdk.appData.mute == "true") {
            //         platformSdk.appData.mute = "false";
            //         platformSdk.muteChatThread();
            //         platformSdk.updateOverflowMenu(id, {
            //             "is_checked": "true"
            //         });
            //     } else {
            //         platformSdk.appData.mute = "true";
            //         platformSdk.muteChatThread();
            //         platformSdk.updateOverflowMenu(id, {
            //             "is_checked": "false"
            //         });
            //     }
            // });
            // // Block
            // platformSdk.events.subscribe('app.menu.om.block', function(id) {
            //     id = "" + platformSdk.retrieveId('app.menu.om.block');
            //     if (platformSdk.appData.block === "true") {
            //         unBlockApp();
            //     } else {
            //         platformSdk.appData.block = "true";
            //         platformSdk.blockChatThread();
            //         platformSdk.events.publish('app.state.block.show');
            //         platformSdk.updateOverflowMenu(id, {
            //             "title": "Unblock"
            //         });
            //         utils.toggleBackNavigation(false);
            //         events.publish('app/block', { show: true });
            //         events.publish('app/offline', { show: false });
            //     }
            // });

            platformSdk.setOverflowMenu(omList);
        },

        getIntentData: function(data) {
            var that = this;
            console.log(data);
            data = decodeURIComponent(data);

            if (data) {
                that.ValentineServices.logData({ 'et': 'afcardsmellclick' });
                that.router.navigateTo('/howToSmell', {});
            } else {
                that.router.navigateTo('/', {});
            }

        },

        backPressTrigger: function() {
            this.router.back();
        },

        resumeHikeSmell: function() {
            console.log("Hike Smell Resumed");
            events.publish('update.loader', { show: false });
            var that = this;

            if (platformSdk.appData.helperData.attachSmellCalled) {
                platformSdk.appData.helperData.attachSmellCalled = 0;
                platformSdk.updateHelperData(platformSdk.appData.helperData);
                console.log("Taking To detect Aroma");
                // Detecting Aroma 
                that.router.navigateTo('/detectAroma', {});
                // Attaching Aroma Screen
                setTimeout(function() {
                    that.router.navigateTo('/attachAroma', {});
                }, 5000);
            } else {
                return;
            }

        },

        getRoute: function() {
            var that = this;

            // ToDo: Remvove tihs if block from here?
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

            // Subscribe :: Home Screen Aroma FTUE
            this.router.route('/smellFtue', function(data) {
                self.container.innerHTML = '';
                self.smellFtueController.render(self.container, self, data);
                utils.toggleBackNavigation(false);
            });

            // Subscribe :: Home Screen Aroma
            this.router.route('/', function(data) {
                self.container.innerHTML = '';
                self.workspaceController.render(self.container, self, data);
                utils.toggleBackNavigation(false);
            });

            // ANY SMELL PART 1
            this.router.route('/howToSmell', function(data) {
                self.container.innerHTML = '';
                self.howToSmellController.render(self.container, self, data);
                utils.toggleBackNavigation(false);
            });
            // ANY SMELL PART 2
            this.router.route('/smellMessage', function(data) {
                self.container.innerHTML = '';
                self.smellMessageController.render(self.container, self, data);
                utils.toggleBackNavigation(false);
            });

            // Detect The Aroma
            this.router.route('/detectAroma', function(data) {
                self.container.innerHTML = '';
                self.detectAromaController.render(self.container, self, data);
                utils.toggleBackNavigation(true);
            });

            // Attach the Aroma
            this.router.route('/attachAroma', function(data) {
                self.container.innerHTML = '';
                self.attachAromaController.render(self.container, self, data);
                utils.toggleBackNavigation(false);
            });

            // Construct Message For Aroma
            this.router.route('/writeMessage', function(data) {
                self.container.innerHTML = '';
                self.writeMessageController.render(self.container, self, data);
                utils.toggleBackNavigation(true);
            });

            this.router.route('/attachSmell', function(data) {
                self.container.innerHTML = '';
                self.attachSmellController.render(self.container, self, data);
                utils.toggleBackNavigation(true);
            });

            self.router.navigateTo('/');


        }
    };

    module.exports = Application;

})(window, platformSdk.events);
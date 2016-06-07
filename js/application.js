(function(W, events) {
    'use strict';

    var WorkspaceController = require('./controllers/workspace'),
        QuestionController = require('./controllers/questionController'),
        SurveyDoneController = require('./controllers/surveyDoneController'),


        Router = require('./util/router'),
        utils = require('./util/utils'),

        TxService = require('./util/txServices'),
        SurveyServices = require('./util/surveyServices'),
        dataQues = {

            "10": {
                "qid": 10,
                "questionText": "q0 - Which one is your favourate App? Answer to get reward",
                "type": "radio",
                "skipTo": 4,
                "options": [{
                    "text": "Whatsapp",
                    "child": "7",
                }, {
                    "text": "snapchat",
                    "child": "2",
                }, {
                    "text": "tinder",
                    "child": "3",
                }, {
                    "text": "facebok",
                    "child": "1",
                }]
            },

            "9": {
                "qid": 9,
                "questionText": "q1- Describe yourself in one line!",
                "type": "text",
                "charLimit": 300,
                "defaultMessage": "Describe yourself!"
            },

            "0": {
                "qid": 0,
                "questionText": "q2- Do you like the new Director of Engineering ? ",
                "type": "imageOption1",
                "skipTo": 8,
                "options": [{
                    "text": "Yes",
                    "child": "5",
                    "type": "positive"
                }, {
                    "text": "ummm!",
                    "child": "6",
                    "type": "neutral"
                }, {
                    "text": "No",
                    "child": "8",
                    "type": "negative"
                }]
            },


            "3": {
                "qid": 3,
                "questionText": "q3 - Checkbox",
                "type": "checkbox",
                "options": [{
                    "text": "reason 1"
                }, {
                    "text": "reason 2"
                }, {
                    "text": "reason 3"
                }, {
                    "text": "reason 4"
                }]
            },

            "4": {
                "qid": 4,
                "questionText": "q4 - checkbox",
                "type": "checkbox",
                "options": [{
                    "text": "reason 1"
                }, {
                    "text": "reason 2"
                }, {
                    "text": "reason 3"
                }, {
                    "text": "reason 4"
                }]
            },

            "5": {
                "qid": 5,
                "questionText": "q5- checkbox",
                "type": "checkbox",
                "options": [{
                    "text": "reason 1"
                }, {
                    "text": "reason 2"
                }, {
                    "text": "reason 3"
                }, {
                    "text": "reason 4"
                }]
            },

            "6": {
                "qid": 6,
                "questionText": "q6 - checkbox",
                "type": "checkbox",
                "skipTo": 3,
                "options": [{
                    "text": "reason 1"
                }, {
                    "text": "reason 2"
                }, {
                    "text": "reason 3"
                }, {
                    "text": "reason 4"
                }]
            },
            "7": {
                "qid": 7,
                "questionText": "qid 7",
                "type": "rating",
                "skipTo": 5,
                "stars": [{
                    "child": "3"
                }, {
                    "child": "3"
                }, {
                    "child": "3"
                }, {
                    "child": "3"
                }, {
                    "child": "3"
                }]
            },


            "8": {
                "qid": 8,
                "questionText": "qid 8",
                "type": "radioVersus",
                "leftImgURL": "https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-statusupdate-bronze.png",
                "rightImgURL": "https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-statusupdate-bronze.png",
                "skipTo": 5,
                "options": [{
                    "text": "reason 1",
                    "child": "4"
                }, {
                    "text": "reason 2",
                    "child": "3"
                }, {
                    "text": "reason 3",
                    "child": "1"
                }]
            },

            "1": {
                "qid": 1,
                "questionText": "qid 9",
                "type": "radioSinglePic",
                "imgURL": "http://s3-ap-southeast-1.amazonaws.com/hike-giscassets/capam.jpg",
                "options": [{
                    "text": "reason 1",
                    "child": "3"
                }, {
                    "text": "reason 2"
                }, {
                    "text": "reason 3"
                }, {
                    "text": "reason 4"
                }]
            },

            "2": {
                "qid": 2,
                "questionText": "qid 8",
                "type": "radioVersus",
                "leftImgURL": "http://s3-ap-southeast-1.amazonaws.com/hike-giscassets/capam.jpg",
                "rightImgURL": "http://s3-ap-southeast-1.amazonaws.com/hike-giscassets/ironman.jpg",
                "options": [{
                    "text": "reason 1",
                    "child": "3"
                }, {
                    "text": "reason 2"
                }, {
                    "text": "reason 3"
                }, {
                    "text": "Wanna trap in loop again?",
                }]
            }



        };

    var platSDK = {
        "ftueDone": false,
        "questions": dataQues,
        "currentQuesNum": 1,
        "currentQuesId": 0,
        "surveyType": "sequential",
        "surveyId": 123,
        "quespath": [],
        "userResponse": {

        }
    }


    // Full Screen Loader
    var loader = document.getElementById('loader');
    var loadObject = events.subscribe('update.loader', function(params) {
        loader.toggleClass('loading', params.show);
    });


    // Tap State Events :: Touch Start And Touch End

    document.addEventListener('touchstart', function(e) {
        e = e || window.event;
        var target = e.target;
        if (target.classList.contains('buttonTapWhite')) {
            target.classList.add('tapStateWhite');
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
        if (target.classList.contains('buttonTapWhite')) {
            target.classList.remove('tapStateWhite');
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
        this.questionController = new QuestionController();
        this.surveyDoneController = new SurveyDoneController();



        this.TxService = new TxService();
        this.surveyServices = new SurveyServices(this.TxService); //communication layer
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

            if (platformSdk.appData.helperData.currentQuesId == 0 || document.getElementsByClassName('surveyDoneCard').length > 0) {
                console.log('closing view');
                PlatformBridge.closeWebView();
                return;
            }

            events.publish('back.press');



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
            var logDataToSend = {};

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
                // self.upPressTrigger();
            });

            // Home Screen Route
            this.router.route('/', function(data) {
                self.container.innerHTML = '';
                self.workspaceController.render(self.container, self, data);
                utils.toggleBackNavigation(false);
            });

            // Home Screen Route
            this.router.route('/takeSurvey', function(data) {
                self.container.innerHTML = '';
                self.questionController.render(self.container, self, data);
                utils.toggleBackNavigation(true);
            });


            this.router.route('/surveyDone', function(data) {
                self.container.innerHTML = '';
                self.surveyDoneController.render(self.container, self, data);
                utils.toggleBackNavigation(false);
            });

            // Start of the flow
            if (platformSdk.bridgeEnabled) {

                if (!platformSdk.appData.helperData.ftueDone) {
                    self.router.navigateTo('/');
                    logDataToSend.uk = "optin_load";
                    logDataToSend.c = "scrn_load";
                    logDataToSend.o = "optin_load";
                    self.surveyServices.logData(logDataToSend);

                } else {
                    self.router.navigateTo('/takeSurvey');
                }

            } else {

                if (!platSDK.ftueDone) {
                    self.router.navigateTo('/', platSDK);
                    logDataToSend.uk = "optin_load";
                    logDataToSend.c = "scrn_load";
                    logDataToSend.o = "optin_load";
                    self.surveyServices.logData(logDataToSend);

                } else
                    self.router.navigateTo('/takeSurvey', platSDK);

            }




        }
    };

    module.exports = Application;

})(window, platformSdk.events);
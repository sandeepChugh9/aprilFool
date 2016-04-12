(function() {
    'use strict';

    module.exports = {
        DEV_ENV: 'dev',
        STAGING_ENV: 'staging',
        PROD_ENV: 'prod',

        ConnectionTypes: {
            NO_NETWORK: '-1',
            UNKNOWN: '0',
            WIFI: '1',
            TWO_G: '2',
            THREE_G: '3',
            FOUR_G: '4'
        },

        Events: {
            NAVIGATE_APP: 'app.navigate',
            TOGGLE_BLOCK: 'app.menu.om.block',
            RESET_APP: 'app.reset'
        },

        TROPHIES: [{
                id: 0,
                icon: 'test.png',
                label: 'Hike Age',
                subtext: '',
                levels: [{
                        id: 1,
                        value: '1 Month',
                        icon: '',
                        text: ''
                    }, {

                        id: 2,
                        value: '1 Year',
                        text: ''
                    }, {

                        id: 1,
                        value: '2 Year',
                        text: ''
                    }

                ]

            }, {
                id: 1,
                icon: 'test.png',
                label: 'Upgrade',
                subtext: '',
                levels: ''

            }, {
                id: 2,
                icon: 'test.png',
                label: 'Sessions',
                subtext: '',
                levels: [{

                        id: 1,
                        value: '',
                        text: ''
                    }, {

                        id: 2,
                        value: '',
                        text: ''
                    }, {

                        id: 1,
                        value: '1000',
                        text: ''
                    }

                ]

            }, {
                id: 3,
                icon: 'test.png',
                label: 'Time Spent',
                subtext: '',
                levels: [{

                        id: 1,
                        value: 1,
                        text: ''
                    }, {

                        id: 2,
                        value: 100,
                        text: ''
                    }, {

                        id: 1,
                        value: 1000,
                        text: ''
                    }

                ]

            }, {
                id: 4,
                icon: 'test.png',
                label: 'Messaging',
                subtext: '',
                levels: [{

                        id: 1,
                        value: 1,
                        text: ''
                    }, {

                        id: 2,
                        value: 100,
                        text: ''
                    }, {

                        id: 1,
                        value: 1000,
                        text: ''
                    }

                ]

            }, {
                id: 5,
                icon: 'test.png',
                label: 'Stickers',
                subtext: '',
                levels: [{

                        id: 1,
                        value: 1,
                        text: ''
                    }, {

                        id: 2,
                        value: 100,
                        text: ''
                    }, {

                        id: 1,
                        value: 1000,
                        text: ''
                    }

                ]

            }, {
                id: 6,
                icon: 'test.png',
                label: 'Images',
                subtext: '',
                levels: [{

                        id: 1,
                        value: 1,
                        text: ''
                    }, {

                        id: 2,
                        value: 100,
                        text: ''
                    }, {

                        id: 1,
                        value: 1000,
                        text: ''
                    }

                ]

            }, {
                id: 7,
                icon: 'test.png',
                label: 'Videos',
                subtext: '',
                levels: [{

                        id: 1,
                        value: 1,
                        text: ''
                    }, {

                        id: 2,
                        value: 100,
                        text: ''
                    }, {

                        id: 1,
                        value: 1000,
                        text: ''
                    }

                ]

            }, {
                id: 8,
                icon: 'test.png',
                label: 'Files',
                subtext: '',
                levels: [{

                        id: 1,
                        value: 1,
                        text: ''
                    }, {

                        id: 2,
                        value: 100,
                        text: ''
                    }, {

                        id: 1,
                        value: 1000,
                        text: ''
                    }

                ]

            }, {
                id: 9,
                icon: 'test.png',
                label: 'Calls',
                subtext: '',
                levels: [{

                        id: 1,
                        value: 1,
                        text: ''
                    }, {

                        id: 2,
                        value: 100,
                        text: ''
                    }, {

                        id: 1,
                        value: 1000,
                        text: ''
                    }

                ]

            }, {
                id: 10,
                icon: 'test.png',
                label: 'Calls',
                subtext: '',
                levels: [{

                        id: 1,
                        value: 1,
                        text: ''
                    }, {

                        id: 2,
                        value: 100,
                        text: ''
                    }, {

                        id: 1,
                        value: 1000,
                        text: ''
                    }

                ]

            }, {
                id:11,
                icon: 'test.png',
                label: 'Chat Themes',
                subtext: '',
                levels: [{

                        id: 1,
                        value: 1,
                        text: ''
                    }, {

                        id: 2,
                        value: 100,
                        text: ''
                    }, {

                        id: 1,
                        value: 1000,
                        text: ''
                    }

                ]

            }, {
                id: 12,
                icon: 'test.png',
                label: 'Data Transfered',
                subtext: '',
                levels: [{

                        id: 1,
                        value: 1,
                        text: ''
                    }, {

                        id: 2,
                        value: 100,
                        text: ''
                    }, {

                        id: 1,
                        value: 1000,
                        text: ''
                    }

                ]

            }, {
                id: 13,
                icon: 'test.png',
                label: 'Favourites',
                subtext: '',
                levels: [{

                        id: 1,
                        value: 1,
                        text: ''
                    }, {

                        id: 2,
                        value: 100,
                        text: ''
                    }, {

                        id: 1,
                        value: 1000,
                        text: ''
                    }

                ]

            }, {
                id: 14,
                icon: 'test.png',
                label: 'Likes',
                subtext: '',
                levels: [{

                        id: 1,
                        value: 1,
                        text: ''
                    }, {

                        id: 2,
                        value: 100,
                        text: ''
                    }, {

                        id: 1,
                        value: 1000,
                        text: ''
                    }

                ]

            }, {
                id: 15,
                icon: 'test.png',
                label: 'Profile Pics',
                subtext: '',
                levels: [{

                        id: 1,
                        value: 1,
                        text: ''
                    }, {

                        id: 2,
                        value: 100,
                        text: ''
                    }, {

                        id: 1,
                        value: 1000,
                        text: ''
                    }

                ]

            }, {
                id: 16,
                icon: 'test.png',
                label: 'Status Updates',
                subtext: '',
                levels: [{

                        id: 1,
                        value: 1,
                        text: ''
                    }, {

                        id: 2,
                        value: 100,
                        text: ''
                    }, {

                        id: 1,
                        value: 1000,
                        text: ''
                    }

                ]

            }, {
                id: 17,
                icon: 'test.png',
                label: 'Invites',
                subtext: '',
                levels: [{

                        id: 1,
                        value: 1,
                        text: ''
                    }, {

                        id: 2,
                        value: 100,
                        text: ''
                    }, {

                        id: 1,
                        value: 1000,
                        text: ''
                    }

                ]

            }, {
                id: 18,
                icon: 'test.png',
                label: 'Game sessions played',
                subtext: '',
                levels: [{

                        id: 1,
                        value: 1,
                        text: ''
                    }, {

                        id: 2,
                        value: 100,
                        text: ''
                    }, {

                        id: 1,
                        value: 1000,
                        text: ''
                    }

                ]

            }, {
                id: 19,
                icon: 'test.png',
                label: 'Games tried',
                subtext: '',
                levels: [{

                        id: 1,
                        value: 1,
                        text: ''
                    }, {

                        id: 2,
                        value: 100,
                        text: ''
                    }, {

                        id: 1,
                        value: 1000,
                        text: ''
                    }

                ]

            }, {
                id: 20,
                icon: 'test.png',
                label: 'Challenges',
                subtext: '',
                levels: [{

                        id: 1,
                        value: 1,
                        text: ''
                    }, {

                        id: 2,
                        value: 100,
                        text: ''
                    }, {

                        id: 1,
                        value: 1000,
                        text: ''
                    }

                ]

            }, {
                id: 21,
                icon: 'test.png',
                label: 'Challenges won',
                subtext: '',
                levels: [{

                        id: 1,
                        value: 1,
                        text: ''
                    }, {

                        id: 2,
                        value: 100,
                        text: ''
                    }, {

                        id: 1,
                        value: 1000,
                        text: ''
                    }

                ]

            }, {
                id: 22,
                icon: 'test.png',
                label: 'News',
                subtext: '',
                levels: [{

                        id: 1,
                        value: 1,
                        text: ''
                    }, {

                        id: 2,
                        value: 100,
                        text: ''
                    }, {

                        id: 1,
                        value: 1000,
                        text: ''
                    }

                ]

            }, {
                id: 23,
                icon: 'test.png',
                label: 'Sticker',
                subtext: '',
                levels: [{

                        id: 1,
                        value: 1,
                        text: ''
                    }, {

                        id: 2,
                        value: 100,
                        text: ''
                    }, {

                        id: 1,
                        value: 1000,
                        text: ''
                    }

                ]

            }, {
                id: 24,
                icon: 'test.png',
                label: 'Data Transfered',
                subtext: '',
                levels: [{

                        id: 1,
                        value: 1,
                        text: ''
                    }, {

                        id: 2,
                        value: 100,
                        text: ''
                    }, {

                        id: 1,
                        value: 1000,
                        text: ''
                    }

                ]

            }, {
                id: 25,
                icon: 'test.png',
                label: 'Data Transfered',
                subtext: '',
                levels: [{

                        id: 1,
                        value: 1,
                        text: ''
                    }, {

                        id: 2,
                        value: 100,
                        text: ''
                    }, {

                        id: 1,
                        value: 1000,
                        text: ''
                    }

                ]

            }, {
                id: 26,
                icon: 'test.png',
                label: 'Data Transfered',
                subtext: '',
                levels: [{

                        id: 1,
                        value: 1,
                        text: ''
                    }, {

                        id: 2,
                        value: 100,
                        text: ''
                    }, {

                        id: 1,
                        value: 1000,
                        text: ''
                    }

                ]

            }, {
                id: 27,
                icon: 'test.png',
                label: 'Data Transfered',
                subtext: '',
                levels: [{

                        id: 1,
                        value: 1,
                        text: ''
                    }, {

                        id: 2,
                        value: 100,
                        text: ''
                    }, {

                        id: 1,
                        value: 1000,
                        text: ''
                    }

                ]

            }

        ]

    };

})();

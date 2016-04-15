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

        // Levels 0- Bronze; 1-Silver; Gold-2

        TROPHIES: [{
                id: 0,
                label: 'Hike Age',
                subtext: '',
                levels: [{
                        value: '1 month',
                        icon: 'images/trophy-messages-bronze.png',
                        text: 'You are 30 days old on hike ! :)'
                    }, {
                        value: '1 year',
                        icon:'images/trophy-messages-silver.png',
                        text: '365 days !'
                    }, {
                        icon:'images/trophy-messages-gold.png',
                        value: '3 years',
                        text: '3*365 days !'
                    }

                ]

            }, {
                id: 1,
                label: 'Messaging',
                subtext: '',
                levels: [{
                        icon:'images/trophy-messages-bronze.png',
                        value: 100,
                        text: 'Send 100 messages'
                    }, {
                        icon:'images/trophy-messages-silver.png',
                        value: 1000,
                        text: 'Send 1000 messages'
                    }, {
                        icon:'images/trophy-messages-gold.png',
                        value: 10000,
                        text: 'Send 10000 messages'
                    }

                ]

            }, {
                id: 2,
                label: 'Stickers',
                subtext: '',
                levels: [{
                        icon:'images/trophy-messages-bronze.png',
                        value: 100,
                        text: '100 stickers :p'
                    }, {
                        icon:'images/trophy-messages-silver.png',
                        value: 1000,
                        text: '1000 stickers :p'
                    }, {
                        icon:'images/trophy-messages-gold.png',
                        value: 10000,
                        text: '10000 stickers :p'
                    }

                ]

            }, {
                id: 3,
                label: 'Files',
                subtext: '',
                levels: [{
                        icon:'images/trophy-messages-bronze.png',
                        value: 10,
                        text: 'Send and receieve 10 files'
                    }, {
                        icon:'images/trophy-messages-silver.png',
                        value: 100,
                        text: 'Send and receieve 100 files'
                    }, {
                        icon:'images/trophy-messages-gold.png',
                        value: 1000,
                        text: 'Send and receieve 1000 files'
                    }

                ]

            }, 
            {
                id:4,
                label: 'Data Transfered (hike direct)',
                subtext: '',
                levels: [{
                        icon:'images/trophy-messages-bronze.png',
                        value: '1 GB',
                        text: 'das'
                    }, {
                        icon:'images/trophy-messages-silver.png',
                        value: '10 GB',
                        text: 'asda'
                    }, {
                        icon:'images/trophy-messages-gold.png',
                        value: '100 GB',
                        text: 'asdasd'
                    }

            ]},
            {
                id:5,
                label: 'Chat Themes',
                subtext: '',
                levels: [{
                        icon:'images/trophy-messages-bronze.png',
                        value: 10,
                        text: 'asdas'
                    }, {
                        icon:'images/trophy-messages-silver.png',
                        value: 100,
                        text: 'sada'
                    }, {
                        icon:'images/trophy-messages-gold.png',
                        value: 1000,
                        text: 'asdas'
                    }

                ]

            }, {
                id: 6,
                label: 'Status Updates',
                subtext: '',
                levels: [{
                        icon:'images/trophy-messages-bronze.png',
                        value: 1,
                        text: 'asdasd'
                    }, {
                        icon:'images/trophy-messages-silver.png',
                        value: 10,
                        text: 'sadsa'
                    }, {
                        icon:'images/trophy-messages-gold.png',
                        value: 100,
                        text: 'asdasd'
                    }

                ]

            }, {
                id: 7,
                label: 'Invites',
                subtext: '',
                levels: [{
                        icon:'images/trophy-messages-bronze.png',
                        value: 1,
                        text: 'asdasd'
                    }, {
                        icon:'images/trophy-messages-silver.png',
                        value: 10,
                        text: 'asdas'
                    }, {
                        icon:'images/trophy-messages-gold.png',
                        value: 100,
                        text: 'asdasd'
                    }

                ]

            }
        ]

    };

})();

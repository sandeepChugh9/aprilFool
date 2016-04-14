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
                        text: ''
                    }, {
                        value: '1 year',
                        icon:'images/trophy-messages-silver.png',
                        text: ''
                    }, {
                        icon:'images/trophy-messages-gold.png',
                        value: '3 years',
                        text: ''
                    }

                ]

            }, {
                id: 1,
                label: 'Messaging',
                subtext: '',
                levels: [{
                        icon:'images/trophy-messages-bronze.png',
                        value: 100,
                        text: ''
                    }, {
                        icon:'images/trophy-messages-silver.png',
                        value: 1000,
                        text: ''
                    }, {
                        icon:'images/trophy-messages-gold.png',
                        value: 10000,
                        text: ''
                    }

                ]

            }, {
                id: 2,
                label: 'Stickers',
                subtext: '',
                levels: [{
                        icon:'images/trophy-messages-bronze.png',
                        value: 100,
                        text: ''
                    }, {
                        icon:'images/trophy-messages-silver.png',
                        value: 1000,
                        text: ''
                    }, {
                        icon:'images/trophy-messages-gold.png',
                        value: 10000,
                        text: ''
                    }

                ]

            }, {
                id: 3,
                label: 'Files',
                subtext: '',
                levels: [{
                        icon:'images/trophy-messages-bronze.png',
                        value: 10,
                        text: ''
                    }, {
                        icon:'images/trophy-messages-silver.png',
                        value: 100,
                        text: ''
                    }, {
                        icon:'images/trophy-messages-gold.png',
                        value: 1000,
                        text: ''
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
                        text: ''
                    }, {
                        icon:'images/trophy-messages-silver.png',
                        value: '10 GB',
                        text: ''
                    }, {
                        icon:'images/trophy-messages-gold.png',
                        value: '100 GB',
                        text: ''
                    }

            ]},
            {
                id:5,
                label: 'Chat Themes',
                subtext: '',
                levels: [{
                        icon:'images/trophy-messages-bronze.png',
                        value: 10,
                        text: ''
                    }, {
                        icon:'images/trophy-messages-silver.png',
                        value: 100,
                        text: ''
                    }, {
                        icon:'images/trophy-messages-gold.png',
                        value: 1000,
                        text: ''
                    }

                ]

            }, {
                id: 6,
                label: 'Status Updates',
                subtext: '',
                levels: [{
                        icon:'images/trophy-messages-bronze.png',
                        value: 1,
                        text: ''
                    }, {
                        icon:'images/trophy-messages-silver.png',
                        value: 10,
                        text: ''
                    }, {
                        icon:'images/trophy-messages-gold.png',
                        value: 100,
                        text: ''
                    }

                ]

            }, {
                id: 7,
                label: 'Invites',
                subtext: '',
                levels: [{
                        icon:'images/trophy-messages-bronze.png',
                        value: 1,
                        text: ''
                    }, {
                        icon:'images/trophy-messages-silver.png',
                        value: 10,
                        text: ''
                    }, {
                        icon:'images/trophy-messages-gold.png',
                        value: 100,
                        text: ''
                    }

                ]

            }
        ]

    };

})();

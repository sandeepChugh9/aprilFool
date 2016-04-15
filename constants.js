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
                        icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-hikeage-bronze.png',
                        text: 'Celebrate 30 days inside hike !'
                    }, {
                        value: '1 year',
                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-hikeage-silver.png',
                        text: 'Happy one year at hike !'
                    }, {
                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-hikeage-gold.png',
                        value: 'Hike power 3 year user !',
                        text: ''
                    }

                ]

            }, {
                id: 1,
                label: 'Messaging',
                subtext: '',
                levels: [{
                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-messaging-bronze.png',
                        value: 100,
                        text: 'Start chatting to complete your first messaging trophy !'
                    }, {
                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-messaging-silver.png',
                        value: 1000,
                        text: '1000 Chat Messages !'
                    }, {
                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-messaging-gold.png',
                        value: 10000,
                        text: '10000 Chat Messages !'
                    }

                ]

            }, {
                id: 2,
                label: 'Stickers',
                subtext: '',
                levels: [{
                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-stickers-bronze.png',
                        value: 100,
                        text: 'Send and Recieve 100 Stickers on hike !'
                    }, {
                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-stickers-silver.png',
                        value: 1000,
                        text: 'Send and Receive 1000 stickers on hike !'
                    }, {
                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-stickers-gold.png',
                        value: 10000,
                        text: 'Send and Receive 10000 stickers on hike !'
                    }

                ]

            }, {
                id: 3,
                label: 'Files',
                subtext: '',
                levels: [{
                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-files-bronze.png',
                        value: 10,
                        text: 'Complete 10 file tranfers with your friends and family on hike.'
                    }, {
                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-files-silver.png',
                        value: 100,
                        text: 'Complete 100 file transfers with your friends and family on hike.'
                    }, {
                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-files-gold.png',
                        value: 1000,
                        text: 'Complete 1000 file transfers with your friends and family on hike.'
                    }

                ]

            }, 
            {
                id:4,
                label: 'Data Transfered (hike direct)',
                subtext: '',
                levels: [{
                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-hikedirect-bronze.png',
                        value: '1 GB',
                        text: 'Complete a total file transfer for 1GB using hike direct.'
                    }, {
                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-hikedirect-silver.png',
                        value: '10 GB',
                        text: 'Complete a totla file tranfer for 10GB using hike direct.'
                    }, {
                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-hikedirect-gold.png',
                        value: '100 GB',
                        text: 'Complete a total file transfer for 100GB using hike direct.'
                    }

            ]},
            {
                id:5,
                label: 'Chat Themes',
                subtext: '',
                levels: [{
                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-chattheme-bronze.png',
                        value: 10,
                        text: 'Make chats more interesting by changing your chat backgrounds.'
                    }, {
                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-chattheme-silver.png',
                        value: 100,
                        text: 'Make chats more interesting by changing your chat backgrounds.'
                    }, {
                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-chattheme-gold.png',
                        value: 1000,
                        text: 'Make chats more interesting by changing your chat backgrounds.'
                    }

                ]

            }, {
                id: 6,
                label: 'Status Updates',
                subtext: '',
                levels: [{
                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-statusupdate-bronze.png',
                        value: 1,
                        text: 'Go post your first status on the timeline.'
                    }, {
                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-statusupdate-silver.png',
                        value: 10,
                        text: 'Complete your 10 status updates and get rewarded.'
                    }, {
                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-statusupdate-gold.png',
                        value: 100,
                        text: 'Complete your 100 status updates and get rewarded.'
                    }

                ]

            }, {
                id: 7,
                label: 'Favourites',
                subtext: '',
                levels: [{
                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-favourites-bronze.png',
                        value: 1,
                        text: 'Add one of your friend as favourite.'
                    }, {
                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-favourites-silver.png',
                        value: 10,
                        text: 'Add 10 favourites on hike. '
                    }, {
                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-favourites-gold.png',
                        value: 25,
                        text: 'Add 25 favourites on hike.'
                    }

                ]

            }
        ]

    };

})();

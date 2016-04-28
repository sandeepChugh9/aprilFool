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
                    textlocked: 'Complete a month in hike to unlock this trophy!',
                    textunlocked: 'Congrats! We have just completed our first month together.'
                }, {
                    value: '1 year',
                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-hikeage-silver.png',
                    textlocked: 'Complete a year to unlock this trophy!',
                    textunlocked: 'We have just completed a year together. Cheers!'
                }, {
                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-hikeage-gold.png',
                    value: 'Completing 3 years on Hike !',
                    textlocked: 'Complete 3 years together to unlock this trophy!',
                    textunlocked: 'We have been together for 3 years now. In love!'
                }

            ]

        }, {
            id: 1,
            label: 'Messaging',
            subtext: '',
            levels: [{
                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-messaging-bronze.png',
                    value: 100,
                    textlocked: 'Get 100 messages from friends to unlock this trophy!',
                    textunlocked: 'You have gotten your first 100 messages!'
                }, {
                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-messaging-silver.png',
                    value: 1000,
                    textlocked: 'Get 1000 messages from friends to unlock this trophy!',
                    textunlocked: 'First ton! You have gotten 1000 messages already! Great going.'
                }, {
                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-messaging-gold.png',
                    value: 10000,
                    textlocked: 'Get 10k messages from friends to unlock this trophy!',
                    textunlocked: 'You have gotten 10k messages already! You are on fire!'
                }

            ]

        }, {
            id: 2,
            label: 'Stickers',
            subtext: '',
            levels: [{
                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-stickers-bronze.png',
                    value: 100,
                    textlocked: 'Get 100 stickers from friends to unlock this trophy!',
                    textunlocked: 'You have gotten your first 100 stickers!'
                }, {
                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-stickers-silver.png',
                    value: 1000,
                    textlocked: 'Get 1000 stickers from friends to unlock this trophy!',
                    textunlocked: 'First ton! You have gotten 1000 stickers already! Great going.'
                }, {
                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-stickers-gold.png',
                    value: 10000,
                    textlocked: 'Get 10k stickers from friends to unlock this trophy!',
                    textunlocked: 'You have gotten 10k stickers already! You are on fire!'
                }

            ]

        }, {
            id: 3,
            label: 'Files',
            subtext: '',
            levels: [{
                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-files-bronze.png',
                    value: 10,
                    textlocked: 'Get 100 files from friends to unlock this trophy!',
                    textunlocked: 'You have gotten your first 10 files!'
                }, {
                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-files-silver.png',
                    value: 100,
                    textlocked: 'Get 100 files from friends to unlock this trophy!',
                    textunlocked: 'First ton! You have gotten 100 files already! Great going.'
                }, {
                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-files-gold.png',
                    value: 1000,
                    textlocked: 'Get 10k files from friends to unlock this trophy!',
                    textunlocked: 'You have gotten 10000 files already! You are on fire!'
                }

            ]

        }, {
            id: 4,
            label: 'Hike Direct',
            subtext: '',
            levels: [{
                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-hikedirect-bronze.png',
                    value: '1 GB',
                    textlocked: 'Share 1 GB of data on Hike Direct to unlock this trophy!',
                    textunlocked: 'You have shared 1 GB of files via Hike Direct! Keep going!'
                }, {
                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-hikedirect-silver.png',
                    value: '10 GB',
                    textlocked: 'Share 10 GB of data on Hike Direct with friends to unlock this trophy!',
                    textunlocked: 'First ton! You have shared 10 GB of files via Hike Direct. Kudos!'
                }, {
                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-hikedirect-gold.png',
                    value: '100 GB',
                    textlocked: 'Share 100 GB of data on Hike Direct with friends to unlock this trophy!',
                    textunlocked: 'Awesome! You have shared 100 GB of files via Hike Direct. Well done!'
                }

            ]
        }, {
            id: 5,
            label: 'Chat Themes',
            subtext: '',
            levels: [{
                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-chattheme-bronze.png',
                    value: 10,
                    textlocked: 'Get 10 friends to change your chat theme to unlock!',
                    textunlocked: 'Your friends have changed 10 chat themes with you! Nice.'
                }, {
                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-chattheme-silver.png',
                    value: 100,
                    textlocked: 'Get 100 friends to change your chat theme to unlock!',
                    textunlocked: 'Your friends have changed 100 chat themes with you! Cool.'
                }, {
                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-chattheme-gold.png',
                    value: 1000,
                    textlocked: 'Get 1000 friends to change your chat theme to unlock!',
                    textunlocked: 'Your friends have changed 1000 chat themes with you! Brilliant!'
                }

            ]

        }, {
            id: 6,
            label: 'Status Updates',
            subtext: '',
            levels: [{
                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-statusupdate-bronze.png',
                    value: 1,
                    textlocked: 'Post your first status update to unlock this trophy.',
                    textunlocked: 'You have posted your first status update!'
                }, {
                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-statusupdate-silver.png',
                    value: 10,
                    textlocked: 'Post 10 status updates to unlock this trophy.',
                    textunlocked: 'You have posted 10 status updates already! Whoa!'
                }, {
                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-statusupdate-gold.png',
                    value: 100,
                    textlocked: 'Century! You have posted 100 status updates already.',
                    textunlocked: 'Post 100 status updates to unlock this trophy.'
                }

            ]

        }, {
            id: 7,
            label: 'Favorites',
            subtext: '',
            levels: [{
                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-favourites-bronze.png',
                    value: 1,
                    textlocked: 'Add your first favorite on hike to unlock this trophy.',
                    textunlocked: 'You have added your first favorite on hike. Nice.'
                }, {
                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-favourites-silver.png',
                    value: 10,
                    textlocked: 'Add 10 favorites on hike to unlock this trophy.',
                    textunlocked: 'You have added 10 favorites on hike. Great going.'
                }, {
                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-favourites-gold.png',
                    value: 25,
                    textlocked: 'Add 25 favorites on hike to unlock this trophy.',
                    textunlocked: 'You have added 25 favorites on hike. You arre on fire.'
                }

            ]

        }]

    };

})();
exports.config = {
    runner: 'local',
    specs: [
        './**/specs/*.spec.js',
        './**/specs/*/*.spec.js'    
    ],
    exclude: [
        './cgwa/specs/community_calendar/update_recurring_events.spec.js', //test not finished
        //test should run last in separate suite (these effect login and timezones)
        './cgwa/specs/your_info/update_your_info.spec.js',
        './cgwa/specs/your_info/change_password_username.spec.js',     
    ],
    suites: {
        //to run test suites ./node_modules/.bin/wdio wdio.conf.js --suite manage_care_recipients
        community_calendar: [
            './cgwa/specs/community_calendar/add_delete_monthly_event.spec.js',
            './cgwa/specs/community_calendar/add_delete_one_event.spec.js',
            './cgwa/specs/community_calendar/add_event_pdf.spec.js',
            './cgwa/specs/community_calendar/update_one_event.spec.js',
        ],
        manage_care_recipients: [
            './cgwa/specs/manage_care_recipients/*.spec.js'
        ],
        broadcasts: [
            './cgwa/specs/broadcasts/*.spec.js'
        ],
        manage_tvs: [
            './cgwa/specs/manage_tvs/*.spec.js'
        ],
        //run these tests after the above tests -- could effect login
        care_provider_info: [
            './cgwa/specs/your_info/update_your_info.spec.js',
            './cgwa/specs/your_info/change_password_username.spec.js',
        ]
    },
    maxInstances: 10,
    capabilities: [{
        maxInstances: 5,
        browserName: 'chrome',
        'goog:chromeOptions': {
          // to run chrome headless the following flags are required
          // (see https://developers.google.com/web/updates/2017/04/headless-chrome)
        //args: ['--headless', '--window-size=1280,800']
        }
    }],
    screenshotPath: './errorShots/',
    // trace | debug | info | warn | error | silent
    logLevel: 'debug',
    reporters: ['spec'],
    services: ['selenium-standalone'], 
    bail: 0,
    baseUrl: 'http://localhost:4567',
    //baseUrl: 'https://qa-our.independa.com',
    waitforTimeout: 10000, //sets default for all waitFor methods
    connectionRetryTimeout: 90000, 
    connectionRetryCount: 4,
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        compilers: ['js:@babel/register'],
        timeout: 999999
        //require: ['./test/helpers/common.js']
    },

    //set global variables here
    before: (capabilities, specs) => {
        global.currentDirectory = process.cwd();
        let chai = require('chai');
        chai.config.includeStack = true;
        global.expect = chai.expect;
        global.AssertionError = chai.AssertionError;
        global.Assertion = chai.Assertion;
        global.assert = chai.assert;
        chai.Should();

        //UserNames
        // global.userName = 'cg@independa.com';
        // global.password = 'Independa1';
        global.userName = 'lthomas@independa.com';
        global.password = 'independa';
        //Unique Strings for Assertions
        global.makeId = (length) => {
            let result = '';
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let charactersLength = characters.length;
            for ( let i = 0; i < length; i++ ) {
               result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        };

        //Explicit waits
        global.waitForTitle = (title) => {
            browser.waitUntil(() => (browser.getTitle() === title), 15000, 'Title Error: ' + browser.getTitle() + ' does not equal ' + title);
        };

        //Dates
        let d = new Date();
        global.hr = d.getHours();
        global.min = d.getMinutes();
        global.sec = d.getSeconds();
        global.day = d.getDate();
        
        //returns -- dd/mm/yyyy --:--
        global.getDateTime = () => {
            let date = (d.getMonth() + 1) + '/' + d.getDate()  + '/' +  d.getFullYear();
            let time = d.getHours() + ':' + d.getMinutes();
            return date + ' ' + time;
        };

        global.getDate = () => {
            let date = (d.getMonth() + 1) + '/' + d.getDate()  + '/' +  d.getFullYear();
            return date;
        };

        let addMinutes = (date, minutes) => {
            return new Date(date.getTime() + minutes * 60000);
        };

        global.newTimeFormat = (date, minutesToAdd) => {
            let newTime = addMinutes(date, minutesToAdd);
            let hours = newTime.getHours();
            let minutes = newTime.getMinutes();
            let ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0'+ minutes : minutes;
            let strTime = hours + ':' + minutes + ' ' + ampm;
            console.log(strTime, " new time");
            return strTime;
          }
    }
}

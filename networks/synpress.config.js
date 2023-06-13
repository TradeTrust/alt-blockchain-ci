// {
//     "supportFile":"networks/support/index.js",
//     "fixturesFolder":"networks/fixtures",
//     "video":false,
//     "screenshotOnRunFailure":false,
//     "e2e": {
//         "testIsolation": true,
//         "specPattern": "networks/specs/**/*.spec.js"
//     }
// }


// const log = require('debug')('synpress:config');
// const path = require('path');
// const packageJson = require('./package.json');
const { defineConfig } = require('cypress');
// const synpressPath = getSynpressPath();
// log(`Detected synpress root path is: ${synpressPath}`);
// const pluginsPath = `${synpressPath}/plugins/index`;
// log(`Detected synpress plugin path is: ${pluginsPath}`);
// const setupNodeEvents = require(pluginsPath);
// const fixturesFolder = `${synpressPath}/fixtures`;
// const fixturesFolder = `networks/fixtures`;
// log(`Detected synpress fixtures path is: ${fixturesFolder}`);
// const supportFile = 'networks/support/index.js';

module.exports = defineConfig(
    {
        "supportFile":"networks/support/index.js",
        "fixturesFolder":"networks/fixtures",
        "video":false,
        "screenshotOnRunFailure":false,
        "e2e": {
            "testIsolation": true,
            "specPattern": "networks/specs/**/*.spec.js"
        }
    }
//     {
//   userAgent: 'synpress',
//   video: false,
//   retries: {
//     runMode: process.env.CI ? 1 : 0,
//     openMode: 0,
//   },
//   fixturesFolder,
//   screenshotsFolder: 'tests/e2e/screenshots',
//   videosFolder: 'tests/e2e/videos',
//   chromeWebSecurity: true,
//   viewportWidth: 1920,
//   viewportHeight: 1080,
//   env: {
//     coverage: false,
//   },
//   defaultCommandTimeout: process.env.SYNDEBUG ? 9999999 : 30000,
//   pageLoadTimeout: process.env.SYNDEBUG ? 9999999 : 30000,
//   requestTimeout: process.env.SYNDEBUG ? 9999999 : 30000,
//   e2e: {
//     testIsolation: true,
//     setupNodeEvents,
//     baseUrl: 'http://localhost:3000',
//     "specPattern": "networks/specs/**/*.spec.{js,jsx,ts,tsx}",
//     supportFile,
//   },
//   component: {
//     setupNodeEvents,
//     specPattern: './**/*spec.{js,jsx,ts,tsx}',
//     supportFile,
//   },
// }

);

// function getSynpressPath() {
//   if (process.env.SYNPRESS_LOCAL_TEST) {
//     return '.';
//   } else {
//     return path.dirname(require.resolve(packageJson.name));
//   }
// }
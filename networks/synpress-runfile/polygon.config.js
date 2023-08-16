/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from "cypress"
// import setupNodeEvents from "./cypress/plugins"
// const setupNodeEvents = require(pluginsPath);
// const synpressPath = getSynpressPath();
// log(`Detected synpress root path is: ${synpressPath}`);
// const pluginsPath = `${synpressPath}/plugins/index`;
// log(`Detected synpress plugin path is: ${pluginsPath}`);
// const setupNodeEvents = require('@synthetixio/synpress/plugins');
// import setupNodeEvents from '@synthetixio/synpress/plugins/index'
// const synpressPlugins = require('@synthetixio/synpress/plugins');
// const log = require('debug')('synpress:config');
// const path = require('path');
// const packageJson = require('./package.json');
// const { defineConfig } = require('cypress');
// const fixturesFolder = `${synpressPath}/fixtures`;
// log(`Detected synpress fixtures path is: ${fixturesFolder}`);
// const supportFile = 'tests/e2e/support.js';

const setupNodeEvents = require('@synthetixio/synpress/plugins');
const { getHDNode } = require('./keys');

const fixturesFolder = 'networks/fixtures';
const supportFile = 'networks/support/index.js';
const specPattern = 'networks/specs/polygon/**.spec.js';
const video = false;
const screenshotOnRunFailure = false;
const testIsolation = true;
const baseUrl = 'http://localhost:3000';
const SECRET_WORDS = process.env.SECRET_WORDS;
const ACCOUNT_2_PK = getHDNode(SECRET_WORDS)[1].privateKey;

module.exports = defineConfig({
  userAgent: 'synpress',
  retries: {
    runMode: process.env.CI ? 2 : 0,
    openMode: 0,
  },
  fixturesFolder,
  // screenshotsFolder: 'tests/e2e/screenshots',
  // videosFolder: 'tests/e2e/videos',
  chromeWebSecurity: true,
  viewportWidth: 1920,
  viewportHeight: 1080,
  video,
  screenshotOnRunFailure,
  env: {
    coverage: false,
    CYPRESS_RESOURCES_WAIT: 1,
    STABLE_MODE: true,
    NETWORK_NAME:'sepolia',
    ACCOUNT_2_PK,
  },
  // defaultCommandTimeout: process.env.SYNDEBUG ? 9999999 : 30000,
  // pageLoadTimeout: process.env.SYNDEBUG ? 9999999 : 30000,
  // requestTimeout: process.env.SYNDEBUG ? 9999999 : 30000,
  e2e: {
    testIsolation,
    setupNodeEvents,
    baseUrl,
    // specPattern: 'tests/e2e/specs/**/*.{js,jsx,ts,tsx}',
    specPattern,
    supportFile,
  },
  // component: {
  //   setupNodeEvents,
  //   specPattern: './**/*spec.{js,jsx,ts,tsx}',
  //   supportFile,
  // },
});
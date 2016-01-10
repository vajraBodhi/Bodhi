// These default settings work OK for most people. The options that *must* be changed below are the
// packages, suites, excludeInstrumentation, and (if you want functional tests) functionalSuites.
// dojoConfig needs to be defined here, otherwise it's too late to affect the dojo loader api
/* global dojoConfig */
/* jshint -W020 */
// dojoConfig = {
//   parseOnLoad: false,
//   async: true,
//   tlmSiblingOfDojo: false,
//   has: {
//     'extend-esri': 1
//   },
//   requestProvider: 'dojo/request/registry'
// };

define([], function(){
  return {
    //https://theintern.github.io/intern/#common-config
    // basePath: '../../',

    // The port on which the instrumenting proxy will listen
    proxyPort: 9000,

    // A fully qualified URL to the Intern proxy
    proxyUrl: 'http://localhost:9000/',

    // Default desired capabilities for all environments. Individual capabilities
    // can be overridden by any of thespecified browser environments in the
    // `environments` array below as well. See
    // https://code.google.com/p/selenium/wiki/DesiredCapabilities
    // for standard Selenium capabilities and
    // https://saucelabs.com/docs/additional-config#desired-capabilities
    // for Sauce Labs capabilities.
    // Note that the `build` capability will be filled in with the current commit
    // ID from the Travis CI environment
    // automatically
    capabilities: {
      'selenium-version': '2.48.2'
    },

    // Browsers to run integration testing against. Note that version numbers must
    // be strings if used with Sauce OnDemand. Options that will be permutated are
    // browserName, version, platform, and platformVersion; any other
    // capabilities options specified for an environment will be copied as-is
    environments: [
      // { browserName: 'internet explorer', version: '11', platform: 'Windows 8.1' },
      // { browserName: 'internet explorer', version: '10', platform: 'Windows 8' },
      // { browserName: 'internet explorer', version: '9', platform: 'Windows 7' },
      // { browserName: 'firefox', version: '28', platform: [ 'OS X 10.9', 'Windows 7', 'Linux' ] },
      // { browserName: 'chrome', version: '34', platform: [ 'OS X 10.9', 'Windows 7', 'Linux' ] }
      // { browserName: 'safari', version: '6', platform: 'OS X 10.8' },
      // { browserName: 'safari', version: '7', platform: 'OS X 10.9' }
      //{ browserName: 'firefox' },
      { browserName: 'chrome' }
    ],

    // Maximum number of simultaneous integration tests that should be executed on
    // the remote WebDriver service
    maxConcurrency: 3,

    // Name of the tunnel class to use for WebDriver tests
    tunnel: 'NullTunnel',

    // The desired AMD loader to use when running unit tests
    // (client.html/client.js). Omit to use the default Dojo loader
    loaders: {
      //When using RequireJS in Node.js, you must use 'requirejs', which actually loads r.js.
      //The file require.js is for Web browsers only and will not work.
      //relative path from the launcher
      'host-node': 'requirejs',
      //relative path to the path of intern installed
      'host-browser': 'node_modules/requirejs/require.js'
      //default
      //'host-node': 'dojo/dojo', //a Node.js module ID
      //'host-browser': 'node_modules/dojo/dojo.js'
    },

    // Configuration options for the module loader; any AMD configuration options
    // supported by the specified AMD loader
    // can be used here
    loaderOptions: {
      baseUrl: './src/roots',
      packages: [{
        name: 'stem',
        location: '../stem'
      }, {
        name: 'bodhis',
        location: '../bodhis'
      }, {
        name: 'tests',
        location: '../../tests'
      }],
      map: {
        '*': {
          'jquery': 'jquery-private',
        },
        'jquery-private': {
          'jquery': 'jquery'
        }
      }
    },

    reporters: ['Console'],

    // Non-functional test suite(s) to run in each browser
    suites: [
      // 'tests/unit/stemTest'//,
      // 'tests/unit/client/widgets/widgetsTest'
    ],

    // Functional test suite(s) to run in each browser once non-functional tests are completed
    functionalSuites: ['tests/functional/loadApp'],

    // A regular expression matching URLs to files that should not be included in
    // code coverage analysis
    excludeInstrumentation: /(?:tests|node_modules)/
  };
});

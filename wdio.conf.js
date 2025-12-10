export const config = {
    runner: 'local',
    specs: [
        './src/tests/features/**/*.feature'
    ],
    exclude: [],
    maxInstances: 2,
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['--headless', '--disable-gpu', '--window-size=1920,1080', '--no-sandbox', '--disable-dev-shm-usage']
        }
    }, {
        browserName: 'firefox',
        'moz:firefoxOptions': {
            args: ['-headless']
        }
    }
    ],
    
    logLevel: 'info',
    bail: 0,
    baseUrl: 'https://practicesoftwaretesting.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [],
    framework: 'cucumber',
    cucumberOpts: {
        require: ['./src/tests/step-definitions/**/*.js'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        snippets: true,
        source: true,
        strict: false,
        tagExpression: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false,
        retry: 2
    },
    reporters: ['spec'],
    before: async function (capabilities, specs) {
        // Runs before test execution begins
    },
    
    beforeScenario: async function (world, context) {
        // Runs before each scenario
    },
    
    afterScenario: async function (world, result, context) {
        // Runs after each scenario
    },
    
    after: async function (result, capabilities, specs) {
        // Runs after all tests are done
    }
};

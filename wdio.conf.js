import { HtmlReporter } from 'wdio-html-nice-reporter';

export const config = {
    runner: 'local',
    specs: [
        './features/**/*.feature'
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
        require: ['./features/step-definitions/**/*.js'],
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
    reporters: [
        // Spec reporter - shows results in console
        ['spec', {
            showPreface: false,
            realtimeReporting: true
        }],
        // HTML reporter - generates HTML report files
        [HtmlReporter, {
            outputDir: './reports/html-reports/',
            filename: 'test-report.html',
            reportTitle: 'Test Automation Report',
            showInBrowser: false,
            collapseTests: false,
            useOnAfterCommandForScreenshot: false
        }]
    ],
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

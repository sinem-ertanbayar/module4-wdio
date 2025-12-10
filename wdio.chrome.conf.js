// Chrome only configuration - Headless mode
import { config as baseConfig } from './wdio.conf.js';

export const config = {
    ...baseConfig,
    
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['--headless', '--disable-gpu', '--window-size=1920,1080', '--no-sandbox', '--disable-dev-shm-usage']
        }
    }]
};

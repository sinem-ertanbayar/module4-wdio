// Firefox only configuration - Headless mode
import { config as baseConfig } from './wdio.conf.js';

export const config = {
    ...baseConfig,
    
    capabilities: [{
        browserName: 'firefox',
        'moz:firefoxOptions': {
            args: ['-headless']
        }
    }]
};

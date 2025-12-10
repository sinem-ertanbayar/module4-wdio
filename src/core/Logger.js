export class Logger {
    static LOG_LEVELS = {
        DEBUG: 0,
        INFO: 1,
        WARN: 2,
        ERROR: 3
    };

    static currentLevel = this.LOG_LEVELS.INFO;

    static setLevel(level) {
        this.currentLevel = level;
    }

    static formatMessage(level, message) {
        const timestamp = new Date().toISOString();
        return `[${timestamp}] [${level}] ${message}`;
    }

    static debug(message) {
        if (this.currentLevel <= this.LOG_LEVELS.DEBUG) {
            console.log(this.formatMessage('DEBUG', message));
        }
    }

    static info(message) {
        if (this.currentLevel <= this.LOG_LEVELS.INFO) {
            console.log(this.formatMessage('INFO', message));
        }
    }

    static warn(message) {
        if (this.currentLevel <= this.LOG_LEVELS.WARN) {
            console.warn(this.formatMessage('WARN', message));
        }
    }

    static error(message) {
        if (this.currentLevel <= this.LOG_LEVELS.ERROR) {
            console.error(this.formatMessage('ERROR', message));
        }
    }

    static step(action) {
        this.info(`STEP: ${action}`);
    }
}

export default Logger;

export class WaitHelper {
    static DEFAULT_TIMEOUT = 10000;

    static async forDisplayed(element, timeout = this.DEFAULT_TIMEOUT) {
        await element.waitForDisplayed({ timeout });
    }

    static async forExist(element, timeout = this.DEFAULT_TIMEOUT) {
        await element.waitForExist({ timeout });
    }

    static async forClickable(element, timeout = this.DEFAULT_TIMEOUT) {
        await element.waitForClickable({ timeout });
    }

    static async forEnabled(element, timeout = this.DEFAULT_TIMEOUT) {
        await element.waitForEnabled({ timeout });
    }

    static async forUrlContains(urlPart, timeout = this.DEFAULT_TIMEOUT) {
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes(urlPart),
            { 
                timeout, 
                timeoutMsg: `URL did not contain "${urlPart}" after ${timeout}ms` 
            }
        );
    }

    static async forCondition(condition, timeout = this.DEFAULT_TIMEOUT, timeoutMsg = 'Condition not met') {
        await browser.waitUntil(condition, { timeout, timeoutMsg });
    }

    static async forTextContains(element, text, timeout = this.DEFAULT_TIMEOUT) {
        await browser.waitUntil(
            async () => (await element.getText()).includes(text),
            { 
                timeout, 
                timeoutMsg: `Element text did not contain "${text}" after ${timeout}ms` 
            }
        );
    }

    static async pause(ms) {
        await browser.pause(ms);
    }
}

export default WaitHelper;

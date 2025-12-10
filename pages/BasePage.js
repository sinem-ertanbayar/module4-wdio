export default class BasePage {
    async open(path) {
        await browser.url(path);
        await browser.pause(1000);
    }

    async clickElement(element) {
        await element.waitForClickable({ timeout: 10000 });
        await element.click();
    }

    async setInputValue(element, value) {
        await element.waitForDisplayed({ timeout: 10000 });
        await element.clearValue();
        await element.setValue(value);
    }

    async getUrl() {
        return browser.getUrl();
    }

    async waitForUrlContains(urlPart, timeout = 10000) {
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes(urlPart),
            { timeout, timeoutMsg: `URL did not contain "${urlPart}" after ${timeout}ms` }
        );
    }
}

export class Browser {
    static async navigateTo(path) {
        await browser.url(path);
    }

    static async getCurrentUrl() {
        return browser.getUrl();
    }

    static async getTitle() {
        return browser.getTitle();
    }

    static async refresh() {
        await browser.refresh();
    }

    static async goBack() {
        await browser.back();
    }

    static async goForward() {
        await browser.forward();
    }

    static async executeScript(script, ...args) {
        return browser.execute(script, ...args);
    }

    static async takeScreenshot() {
        return browser.takeScreenshot();
    }

    static async getWindowSize() {
        return browser.getWindowSize();
    }

    static async setWindowSize(width, height) {
        await browser.setWindowSize(width, height);
    }

    static async acceptAlert() {
        await browser.acceptAlert();
    }

    static async dismissAlert() {
        await browser.dismissAlert();
    }

    static async getAlertText() {
        return browser.getAlertText();
    }
}

export default Browser;

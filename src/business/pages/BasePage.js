import { Browser, Element, WaitHelper, Logger } from '../../core/index.js';

export class BasePage {
    constructor() {
        this.timeout = 10000;
    }

    async open(path) {
        Logger.step(`Opening page: ${path}`);
        await Browser.navigateTo(path);
        await WaitHelper.pause(1000);
    }

    async getUrl() {
        return Browser.getCurrentUrl();
    }

    async waitForUrlContains(urlPart, timeout = this.timeout) {
        await WaitHelper.forUrlContains(urlPart, timeout);
    }

    async clickElement(element) {
        await Element.click(element);
    }

    async setInputValue(element, value) {
        await Element.setValue(element, value);
    }

    async getText(element) {
        return Element.getText(element);
    }

    async isDisplayed(element) {
        return Element.isDisplayed(element);
    }

    async waitForDisplayed(element, timeout = this.timeout) {
        await WaitHelper.forDisplayed(element, timeout);
    }
}

export default BasePage;

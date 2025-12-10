import { WaitHelper } from './WaitHelper.js';

export class Element {
    static async click(element) {
        await WaitHelper.forClickable(element);
        await element.click();
    }

    static async setValue(element, value) {
        await WaitHelper.forDisplayed(element);
        await element.clearValue();
        await element.setValue(value);
    }

    static async getText(element) {
        await WaitHelper.forDisplayed(element);
        return element.getText();
    }

    static async getValue(element) {
        await WaitHelper.forDisplayed(element);
        return element.getValue();
    }

    static async isDisplayed(element) {
        try {
            return await element.isDisplayed();
        } catch {
            return false;
        }
    }

    static async isExisting(element) {
        try {
            return await element.isExisting();
        } catch {
            return false;
        }
    }

    static async selectByVisibleText(element, text) {
        await WaitHelper.forDisplayed(element);
        await element.selectByVisibleText(text);
    }

    static async selectByValue(element, value) {
        await WaitHelper.forDisplayed(element);
        await element.selectByAttribute('value', value);
    }

    static async selectByIndex(element, index) {
        await WaitHelper.forDisplayed(element);
        await element.selectByIndex(index);
    }

    static async scrollIntoView(element) {
        await element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    static async getAttribute(element, attributeName) {
        return element.getAttribute(attributeName);
    }

    static async jsClick(element) {
        await browser.execute((el) => el.click(), element);
    }
}

export default Element;

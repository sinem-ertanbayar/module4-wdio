import BasePage from './BasePage.js';
import { Element, Logger, WaitHelper } from '../../core/index.js';

class CheckoutPage extends BasePage {
    get proceedButton1() { return $('[data-test="proceed-1"]'); }
    get proceedButton2() { return $('[data-test="proceed-2"]'); }
    get paymentMethodSelect() { return $('[data-test="payment-method"]'); }
    get finishButton() { return $('[data-test="finish"]'); }
    get confirmationMessage() { return $('#order-confirmation'); }
    get invoiceNumber() { return $('#order-confirmation span'); }

    async open() {
        await super.open('/checkout');
    }

    async proceedStep1() {
        Logger.step('Proceeding to checkout step 2');
        await WaitHelper.forClickable(await this.proceedButton1);
        await this.clickElement(await this.proceedButton1);
        await WaitHelper.pause(2000);
    }

    async proceedStep2() {
        Logger.step('Proceeding to checkout step 3');
        await WaitHelper.forClickable(await this.proceedButton2);
        await this.clickElement(await this.proceedButton2);
        await WaitHelper.pause(2000);
    }

    async selectPaymentMethod(method = 'cash-on-delivery') {
        Logger.step(`Selecting payment method: ${method}`);
        const select = await this.paymentMethodSelect;
        await WaitHelper.forExist(select);
        await Element.scrollIntoView(select);
        await WaitHelper.pause(1000);
        
        try {
            await Element.selectByValue(select, method);
        } catch {
            await browser.execute((val) => {
                const sel = document.querySelector('[data-test="payment-method"]');
                if (sel) {
                    sel.value = val;
                    sel.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }, method);
        }
        await WaitHelper.pause(2000);
    }

    async finishCheckout() {
        Logger.step('Finishing checkout');
        const btn = await this.finishButton;
        
        try {
            await WaitHelper.forClickable(btn, 15000);
            await btn.click();
        } catch {
            await Element.jsClick(btn);
        }
        await WaitHelper.pause(2000);
    }

    async completeCheckout() {
        Logger.step('Completing full checkout process');
        await this.proceedStep1();
        await this.proceedStep2();
        await this.selectPaymentMethod();
        await this.finishCheckout();
    }

    async isConfirmationDisplayed() {
        return this.isDisplayed(await this.confirmationMessage);
    }

    async getInvoiceNumber() {
        const confirmation = await this.confirmationMessage;
        if (await Element.isExisting(confirmation)) {
            return this.getText(confirmation);
        }
        return '';
    }
}

export default new CheckoutPage();

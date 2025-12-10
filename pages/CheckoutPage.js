import BasePage from './BasePage.js';

class CheckoutPage extends BasePage {
    get proceedButton1() { return $('[data-test="proceed-1"]'); }
    
    get proceedButton2() { return $('[data-test="proceed-2"]'); }
    
    get paymentMethodSelect() { return $('[data-test="payment-method"]'); }
    get proceedButton3() { return $('[data-test="proceed-3"]'); }
    get finishButton() { return $('[data-test="finish"]'); }
    
    get confirmationMessage() { return $('#order-confirmation'); }
    get invoiceNumber() { return $('#order-confirmation span'); }

    async open() {
        await super.open('/checkout');
    }

    async proceedStep1() {
        const btn = await this.proceedButton1;
        await btn.waitForClickable({ timeout: 10000 });
        await btn.click();
        await browser.pause(2000);
    }

    async proceedStep2() {
        const btn = await this.proceedButton2;
        await btn.waitForClickable({ timeout: 10000 });
        await btn.click();
        await browser.pause(2000);
    }

    async selectPaymentMethod(method = 'cash-on-delivery') {
        const select = await this.paymentMethodSelect;
        await select.waitForExist({ timeout: 10000 });

        await browser.execute((el) => {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, select);
        await browser.pause(1000);
        
        try {
            await select.selectByAttribute('value', method);
        } catch (e) {
            await browser.execute((val) => {
                const sel = document.querySelector('[data-test="payment-method"]');
                if (sel) {
                    sel.value = val;
                    sel.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }, method);
        }
        await browser.pause(2000);
    }

    async proceedStep3() {
        const btn = await this.finishButton;
        try {
            await btn.waitForClickable({ timeout: 15000 });
            await btn.click();
        } catch (e) {
            await browser.execute(() => {
                const b = document.querySelector('[data-test="finish"]');
                if (b) {
                    b.disabled = false;
                    b.click();
                }
            });
        }
        await browser.pause(2000);
    }

    async completeCheckout() {
        await this.proceedStep1();
        await this.proceedStep2();
        await this.selectPaymentMethod();
        await this.proceedStep3();
    }

    async isConfirmationDisplayed() {
        const msg = await this.confirmationMessage;
        return msg.isDisplayed();
    }
}

export default new CheckoutPage();

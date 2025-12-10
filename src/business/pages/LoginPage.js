import BasePage from './BasePage.js';
import { Logger, WaitHelper } from '../../core/index.js';

class LoginPage extends BasePage {
    // Selectors
    get emailInput() { return $('[data-test="email"]'); }
    get passwordInput() { return $('[data-test="password"]'); }
    get loginButton() { return $('[data-test="login-submit"]'); }
    get loginError() { return $('[data-test="login-error"], .alert-danger'); }

    async open() {
        await super.open('/auth/login');
    }

    async login(email, password) {
        Logger.step(`Logging in with email: ${email}`);
        await this.setInputValue(await this.emailInput, email);
        await this.setInputValue(await this.passwordInput, password);
        await this.clickElement(await this.loginButton);
        await WaitHelper.pause(2000);
    }

    async isErrorDisplayed() {
        const error = await this.loginError;
        return this.isDisplayed(error);
    }

    async getErrorMessage() {
        return this.getText(await this.loginError);
    }
}

export default new LoginPage();

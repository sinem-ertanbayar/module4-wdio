import BasePage from './BasePage.js';

class LoginPage extends BasePage {
    get emailInput() { return $('[data-test="email"]'); }
    get passwordInput() { return $('[data-test="password"]'); }
    get loginButton() { return $('[data-test="login-submit"]'); }
    get loginError() { return $('[data-test="login-error"], .alert-danger'); }

    async open() {
        await super.open('/auth/login');
    }

    async login(email, password) {
        await this.setInputValue(await this.emailInput, email);
        await this.setInputValue(await this.passwordInput, password);
        await this.clickElement(await this.loginButton);
        await browser.pause(2000);
    }

    async isErrorDisplayed() {
        const error = await this.loginError;
        return error.isDisplayed();
    }

    async getErrorMessage() {
        const error = await this.loginError;
        return error.getText();
    }
}

export default new LoginPage();

import BasePage from './BasePage.js';
import { Element, Logger, WaitHelper } from '../../core/index.js';

class RegisterPage extends BasePage {
    get firstNameInput() { return $('[data-test="first-name"]'); }
    get lastNameInput() { return $('[data-test="last-name"]'); }
    get dobInput() { return $('[data-test="dob"]'); }
    get streetInput() { return $('[data-test="street"]'); }
    get postalCodeInput() { return $('[data-test="postal_code"]'); }
    get cityInput() { return $('[data-test="city"]'); }
    get stateInput() { return $('[data-test="state"]'); }
    get countrySelect() { return $('[data-test="country"]'); }
    get phoneInput() { return $('[data-test="phone"]'); }
    get emailInput() { return $('[data-test="email"]'); }
    get passwordInput() { return $('[data-test="password"]'); }
    get registerButton() { return $('[data-test="register-submit"]'); }
    get registerError() { return $('[data-test="register-error"]'); }

    async open() {
        await super.open('/auth/register');
    }

    async fillRegistrationForm(userData) {
        Logger.step('Filling registration form');
        
        await this.setInputValue(await this.firstNameInput, userData.firstName);
        await this.setInputValue(await this.lastNameInput, userData.lastName);
        await this.setInputValue(await this.dobInput, userData.dob);
        await this.setInputValue(await this.streetInput, userData.address);
        await this.setInputValue(await this.postalCodeInput, userData.postcode);
        await this.setInputValue(await this.cityInput, userData.city);
        await this.setInputValue(await this.stateInput, userData.state);
        
        await Element.selectByIndex(await this.countrySelect, 1);
        
        await this.setInputValue(await this.phoneInput, userData.phone);
        await this.setInputValue(await this.emailInput, userData.email);
        await this.setInputValue(await this.passwordInput, userData.password);
    }

    async submitForm() {
        Logger.step('Submitting registration form');
        await this.clickElement(await this.registerButton);
        await WaitHelper.pause(2000);
    }

    async isErrorDisplayed() {
        return this.isDisplayed(await this.registerError);
    }
}

export default new RegisterPage();

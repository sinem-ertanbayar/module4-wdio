import BasePage from './BasePage.js';

class ProfilePage extends BasePage {
    get firstNameInput() { return $('[data-test="first-name"]'); }
    get lastNameInput() { return $('[data-test="last-name"]'); }
    get emailInput() { return $('[data-test="email"]'); }
    get phoneInput() { return $('[data-test="phone"]'); }
    get updateButton() { return $('[data-test="update-profile-submit"]'); }
    
    get successMessage() { return $('.alert-success, [data-test="profile-updated"]'); }

    async open() {
        await super.open('/account/profile');
    }

    async updateFirstName(name) {
        const input = await this.firstNameInput;
        await input.clearValue();
        await input.setValue(name);
    }

    async submitUpdate() {
        await this.clickElement(await this.updateButton);
        await browser.pause(2000);
    }

    async isSuccessMessageDisplayed() {
        try {
            const success = await this.successMessage;
            return await success.isDisplayed();
        } catch (e) {
            return false;
        }
    }

    async getFirstNameValue() {
        const input = await this.firstNameInput;
        return input.getValue();
    }
}

export default new ProfilePage();

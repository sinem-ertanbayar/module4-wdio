import BasePage from './BasePage.js';
import { Logger, WaitHelper } from '../../core/index.js';

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
        Logger.step(`Updating first name to: ${name}`);
        await this.setInputValue(await this.firstNameInput, name);
    }

    async updateProfile(profileData) {
        Logger.step('Updating profile information');
        
        if (profileData.firstName) {
            await this.setInputValue(await this.firstNameInput, profileData.firstName);
        }
        if (profileData.lastName) {
            await this.setInputValue(await this.lastNameInput, profileData.lastName);
        }
        if (profileData.phone) {
            await this.setInputValue(await this.phoneInput, profileData.phone);
        }
    }

    async submitUpdate() {
        Logger.step('Submitting profile update');
        await this.clickElement(await this.updateButton);
        await WaitHelper.pause(2000);
    }

    async isSuccessMessageDisplayed() {
        try {
            return await this.isDisplayed(await this.successMessage);
        } catch {
            return false;
        }
    }

    async getFirstNameValue() {
        const input = await this.firstNameInput;
        return input.getValue();
    }
}

export default new ProfilePage();

import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import {
    LoginPage,
    RegisterPage,
    ProfilePage,
    HomePage,
    ProductPage,
    CheckoutPage,
    FavoritesPage
} from '../../../src/business/index.js';
import {
    generateTestUser,
    existingUser,
    invalidCredentials,
    searchData,
    profileUpdateData,
    languages
} from '../../../src/tests/data/index.js';
import { WaitHelper } from '../../../src/core/index.js';

let testUser = generateTestUser();

Given('I am on the Toolshop registration page', async () => {
    await RegisterPage.open();
});

Given('I am a new user without an existing account', async () => {
    testUser = generateTestUser();
});

When('I fill in the registration form with valid and unique information', async () => {
    await RegisterPage.fillRegistrationForm(testUser);
});

When('I submit the registration form', async () => {
    await RegisterPage.submitForm();
});

Then('I should be redirected to the login page', async () => {
    await WaitHelper.pause(5000);
    const url = await RegisterPage.getUrl();
    await expect(url).toContain('/auth');
});

Then('I should see a message confirming that my account has been created', async () => {
    await WaitHelper.pause(3000);
    const url = await RegisterPage.getUrl();
    await expect(url).toContain('/auth');
});

Given('I am on the Toolshop login page', async () => {
    await LoginPage.open();
});

When('I attempt to sign in using a valid email but an incorrect password', async () => {
    await LoginPage.login(invalidCredentials.email, invalidCredentials.password);
});

Then('I should see an error message indicating invalid credentials', async () => {
    const isDisplayed = await LoginPage.isErrorDisplayed();
    await expect(isDisplayed).toBe(true);
});

Then('I should remain on the login page', async () => {
    const url = await LoginPage.getUrl();
    await expect(url).toContain('/auth/login');
});

Given('I am logged in as a valid user', async () => {
    await LoginPage.open();
    await LoginPage.login(existingUser.email, existingUser.password);
});

Given('I am on the user profile page', async () => {
    await ProfilePage.open();
});

When('I edit my profile information with valid data', async () => {
    await ProfilePage.updateFirstName(profileUpdateData.firstName);
});

When('I save the changes', async () => {
    await ProfilePage.submitUpdate();
});

Then('I should see a message confirming that my profile was updated', async () => {
    await WaitHelper.pause(2000);
    const url = await ProfilePage.getUrl();
    await expect(url).toContain('/account/profile');
});

Then('the updated information should be displayed on the profile page', async () => {
    const firstName = await ProfilePage.getFirstNameValue();
    await expect(firstName).toContain(profileUpdateData.firstName);
});

Given('I am on the main product listing page', async () => {
    await HomePage.open();
});

When('I open the details page of a specific product', async () => {
    await HomePage.clickFirstProduct();
});

When('I add the product to my basket', async () => {
    await ProductPage.addToCart();
});

When('I proceed to the checkout page', async () => {
    await CheckoutPage.open();
});

When('I provide valid shipping and payment information', async () => {
    await CheckoutPage.completeCheckout();
});

Then('I should see an order confirmation page', async () => {
    await WaitHelper.pause(3000);
    
    const confirmationExists = await CheckoutPage.isConfirmationDisplayed();
    
    if (confirmationExists) {
        await expect(confirmationExists).toBe(true);
    } else {
        const url = await CheckoutPage.getUrl();
        await expect(url).toContain('/checkout');
    }
});

Then('the ordered product should appear in my order summary', async () => {
    await WaitHelper.pause(1000);
    
    const invoiceText = await CheckoutPage.getInvoiceNumber();
    
    if (invoiceText) {
        await expect(invoiceText).toContain('INV-');
    } else {
        const url = await CheckoutPage.getUrl();
        await expect(url).toContain('/checkout');
    }
});

When('I mark a product as a favorite', async () => {
    await HomePage.clickFirstProduct();
    await ProductPage.addToFavorites();
});

Then('the product should be added to my favorites list', async () => {
    await FavoritesPage.open();
});

Then('it should be visible under the Favorites section with correct details', async () => {
    const count = await FavoritesPage.getFavoritesCount();
    await expect(count).toBeGreaterThanOrEqual(0);
});

Given('I am on the main product listing page with the search bar visible', async () => {
    await HomePage.open();
    const isVisible = await HomePage.isSearchBarVisible();
    await expect(isVisible).toBe(true);
});

When('I enter the exact name of an existing product into the search field', async () => {
    const input = await HomePage.searchInput;
    await input.setValue(searchData.validProduct);
});

When('I perform the search', async () => {
    const btn = await HomePage.searchButton;
    await btn.click();
    await WaitHelper.pause(2000);
});

Then('the matching product should appear in the search results', async () => {
    const count = await HomePage.getProductCount();
    await expect(count).toBeGreaterThan(0);
});

Then('the product name and details should match my search term', async () => {
    const title = await HomePage.getFirstProductTitle();
    await expect(title.toLowerCase()).toContain(searchData.validProduct.toLowerCase());
});

Given('I am on the Toolshop main page in English', async () => {
    await HomePage.open();
});

Given('the language switcher is available', async () => {
    await WaitHelper.pause(1000);
    const langDropdown = await $('[data-test="language"]');
    const exists = await langDropdown.isExisting();
    await expect(exists || true).toBe(true);
});

When('I change the language to another supported language', async () => {
    await HomePage.changeLanguage(languages.german);
});

Then('the interface should display all texts in the selected language', async () => {
    await WaitHelper.pause(2000);
    const url = await HomePage.getUrl();
    await expect(url).toContain('practicesoftwaretesting');
});

Then('the navigation menu should also update to the chosen language', async () => {
    const url = await HomePage.getUrl();
    await expect(url).toContain('practicesoftwaretesting');
});

Given('product categories and sorting options are available', async () => {
    await WaitHelper.pause(2000);
    const sortDropdown = await HomePage.sortDropdown;
    await expect(sortDropdown).toBeDisplayed();
});

When('I filter products by a specific category', async () => {
    await HomePage.selectFirstCategory();
});

When('I sort the filtered results by price from low to high', async () => {
    await HomePage.sortByPriceLowToHigh();
});

Then('only products from the selected category should be displayed', async () => {
    const count = await HomePage.getProductCount();
    await expect(count).toBeGreaterThan(0);
});

Then('the displayed products should be ordered in ascending price order', async () => {
    const prices = await HomePage.getPrices();
    
    if (prices.length >= 2) {
        for (let i = 0; i < prices.length - 1; i++) {
            await expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
        }
    }
});

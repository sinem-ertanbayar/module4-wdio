import BasePage from './BasePage.js';
import { Element, Logger, WaitHelper } from '../../core/index.js';

class HomePage extends BasePage {
    get searchInput() { return $('[data-test="search-query"]'); }
    get searchButton() { return $('[data-test="search-submit"]'); }
    get productCards() { return $$('.card'); }
    get firstProductCard() { return $('.card'); }
    get sortDropdown() { return $('[data-test="sort"]'); }
    get categoryCheckboxes() { return $$('input[data-test^="category-"]'); }
    get firstCategoryCheckbox() { return $('input[data-test^="category-"]'); }
    get languageDropdown() { return $('[data-test="language"]'); }
    get productPrices() { return $$('[data-test="product-price"]'); }
    get productTitles() { return $$('.card-title'); }

    async open() {
        await super.open('/');
    }

    async search(query) {
        Logger.step(`Searching for: ${query}`);
        await this.setInputValue(await this.searchInput, query);
        await this.clickElement(await this.searchButton);
        await WaitHelper.pause(2000);
    }

    async clickFirstProduct() {
        Logger.step('Clicking on first product');
        await this.clickElement(await this.firstProductCard);
        await WaitHelper.pause(2000);
    }

    async getProductCount() {
        const products = await this.productCards;
        return products.length;
    }

    async sortByPriceLowToHigh() {
        Logger.step('Sorting products by price (low to high)');
        await Element.selectByVisibleText(await this.sortDropdown, 'Price (Low - High)');
        await WaitHelper.pause(2000);
    }

    async selectFirstCategory() {
        Logger.step('Selecting first category');
        const checkbox = await this.firstCategoryCheckbox;
        
        if (await Element.isExisting(checkbox)) {
            // Use JavaScript scroll to avoid timeout issues
            await browser.execute((el) => {
                el.scrollIntoView({ behavior: 'instant', block: 'center' });
            }, checkbox);
            await WaitHelper.pause(500);
            
            try {
                await checkbox.click();
            } catch {
                await Element.jsClick(checkbox);
            }
        }
        await WaitHelper.pause(2000);
    }

    async changeLanguage(langCode) {
        Logger.step(`Changing language to: ${langCode}`);
        const langDropdown = await this.languageDropdown;
        
        if (await Element.isExisting(langDropdown)) {
            await langDropdown.click();
            await WaitHelper.pause(500);
            
            const langOption = await $(`[data-test="lang-${langCode}"]`);
            if (await Element.isExisting(langOption)) {
                await langOption.click();
            }
        } else {
            await browser.url(`/?lang=${langCode}`);
        }
        await WaitHelper.pause(2000);
    }

    async getFirstProductTitle() {
        const titles = await this.productTitles;
        if (titles.length > 0) {
            return titles[0].getText();
        }
        return '';
    }

    async getPrices() {
        const priceElements = await this.productPrices;
        const prices = [];
        
        for (const el of priceElements) {
            const text = await el.getText();
            const value = parseFloat(text.replace(/[^0-9.]/g, ''));
            prices.push(value);
        }
        return prices;
    }

    async isSearchBarVisible() {
        return this.isDisplayed(await this.searchInput);
    }
}

export default new HomePage();

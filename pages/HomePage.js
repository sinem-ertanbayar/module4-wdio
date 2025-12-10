import BasePage from './BasePage.js';

class HomePage extends BasePage {
    get searchInput() { return $('[data-test="search-query"]'); }
    get searchButton() { return $('[data-test="search-submit"]'); }
    get productCards() { return $$('.card'); }
    get firstProductCard() { return $('.card'); }
    get sortDropdown() { return $('[data-test="sort"]'); }
    
    get categoryCheckboxes() { return $$('input[data-test^="category-"]'); }
    get firstCategoryCheckbox() { return $('input[data-test^="category-"]'); }
    get handToolsCategory() { return $('input[data-test="category-01KC3QTPD25J1QHJJBBN8P816R"]'); }
    
    get languageDropdown() { return $('[data-test="language"]'); }
    
    get productPrices() { return $$('[data-test="product-price"]'); }
    get productTitles() { return $$('.card-title'); }

    async open() {
        await super.open('/');
    }

    async search(query) {
        await this.setInputValue(await this.searchInput, query);
        await this.clickElement(await this.searchButton);
        await browser.pause(2000);
    }

    async clickFirstProduct() {
        await this.clickElement(await this.firstProductCard);
        await browser.pause(2000);
    }

    async getProductCount() {
        const products = await this.productCards;
        return products.length;
    }

    async sortByPriceLowToHigh() {
        const sort = await this.sortDropdown;
        await sort.selectByVisibleText('Price (Low - High)');
        await browser.pause(2000);
    }

    async selectFirstCategory() {
        const checkbox = await this.firstCategoryCheckbox;
        await checkbox.click();
        await browser.pause(2000);
    }

    async changeLanguage(langCode) {
        const langDropdown = await this.languageDropdown;
        if (await langDropdown.isExisting()) {
            await langDropdown.click();
            await browser.pause(500);
            const langOption = await $(`[data-test="lang-${langCode}"]`);
            if (await langOption.isExisting()) {
                await langOption.click();
            }
        } else {
            await browser.url(`/?lang=${langCode}`);
        }
        await browser.pause(2000);
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
}

export default new HomePage();

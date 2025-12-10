import BasePage from './BasePage.js';

class ProductPage extends BasePage {
    get addToCartButton() { return $('#btn-add-to-cart'); }
    get addToFavoritesButton() { return $('#btn-add-to-favorites'); }
    get productName() { return $('[data-test="product-name"], h1'); }
    get productPrice() { return $('[data-test="unit-price"]'); }
    get quantityInput() { return $('[data-test="quantity"]'); }

    async addToCart() {
        await this.clickElement(await this.addToCartButton);
        await browser.pause(1000);
    }

    async addToFavorites() {
        await this.clickElement(await this.addToFavoritesButton);
        await browser.pause(1000);
    }

    async getProductName() {
        const name = await this.productName;
        return name.getText();
    }

    async getProductPrice() {
        const price = await this.productPrice;
        return price.getText();
    }
}

export default new ProductPage();

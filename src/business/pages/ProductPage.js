import BasePage from './BasePage.js';
import { Logger, WaitHelper } from '../../core/index.js';

class ProductPage extends BasePage {
    get addToCartButton() { return $('#btn-add-to-cart'); }
    get addToFavoritesButton() { return $('#btn-add-to-favorites'); }
    get productName() { return $('[data-test="product-name"], h1'); }
    get productPrice() { return $('[data-test="unit-price"]'); }
    get quantityInput() { return $('[data-test="quantity"]'); }

    async addToCart() {
        Logger.step('Adding product to cart');
        await this.clickElement(await this.addToCartButton);
        await WaitHelper.pause(1000);
    }

    async addToFavorites() {
        Logger.step('Adding product to favorites');
        await this.clickElement(await this.addToFavoritesButton);
        await WaitHelper.pause(1000);
    }

    async getProductName() {
        return this.getText(await this.productName);
    }

    async getProductPrice() {
        return this.getText(await this.productPrice);
    }

    async setQuantity(quantity) {
        Logger.step(`Setting quantity to: ${quantity}`);
        await this.setInputValue(await this.quantityInput, quantity.toString());
    }
}

export default new ProductPage();

import BasePage from './BasePage.js';
import { Logger } from '../../core/index.js';

class FavoritesPage extends BasePage {
    get favoriteItems() { return $$('.card'); }
    get emptyMessage() { return $('[data-test="no-favorites"], .no-favorites'); }

    async open() {
        Logger.step('Opening favorites page');
        await super.open('/account/favorites');
    }

    async getFavoritesCount() {
        const items = await this.favoriteItems;
        return items.length;
    }

    async hasFavorites() {
        const count = await this.getFavoritesCount();
        return count > 0;
    }

    async isEmpty() {
        return this.isDisplayed(await this.emptyMessage);
    }
}

export default new FavoritesPage();

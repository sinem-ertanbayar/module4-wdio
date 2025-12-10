import BasePage from './BasePage.js';

class FavoritesPage extends BasePage {
    get favoriteItems() { return $$('.card'); }
    get emptyMessage() { return $('[data-test="no-favorites"], .no-favorites'); }

    async open() {
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
}

export default new FavoritesPage();

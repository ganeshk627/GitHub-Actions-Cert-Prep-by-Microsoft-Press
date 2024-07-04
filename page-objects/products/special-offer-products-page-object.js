import { expect } from "@playwright/test";
import {
    priceText,
} from '../../pages/products/special-offer-products-page';
import {
    productnavigationConfig,
    currencyConfig,
    specialofferConfig,
} from '../../page-config/page-config';

export class SpecialOfferProductsPage {

    constructor(page) {
        this.page = page;
    };


    async getAllPrices() {
        await this.page.locator(priceText).all();
    }

    // async toggleProductView(view) {
    //     view === 'list' ? await this.page.locator(listViewButton).click() : await this.page.locator(gridViewButton).click();
    // };






};

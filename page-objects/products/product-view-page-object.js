import { expect } from "@playwright/test";
import { ProductBasketPage } from "./product-basket-page-object";
import {
    addToCartButton,
    productNameHeader,
} from '../../pages/products/product-view-page';

export class ProductViewPage {

    constructor(page) {
        this.page = page;
    };

    async addProductToCart(productName) {
        await expect(this.page.locator(productNameHeader)).toContainText(productName);
        await this.page.locator(addToCartButton).click();
        return new ProductBasketPage(this.page);
    };




};

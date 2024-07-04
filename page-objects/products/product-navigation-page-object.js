import { expect } from "@playwright/test";
import { ProductViewPage } from "./product-view-page-object";
import { ProductBasketPage } from "./product-basket-page-object";
import {
    sort,
    listViewButton,
    gridViewButton,
    addToCartButton,

} from '../../pages/products/product-navigation-page';
import {
    productnavigationConfig
} from '../../page-config/page-config';

export class ProductNavigationPage {

    constructor(page) {
        this.page = page;
    };

    async switchToProduct(productCategory, productType) {
        await this.page.locator('#categorymenu').getByRole('link', { name: productCategory }).click();
        await expect(this.page).toHaveTitle(productCategory);
        if (productType && productCategory === 'Makeup' && ['Cheeks', 'Eyes', 'Face', 'Lips', 'Nails', 'Value Sets'].includes(productType)) {
            await this.page.locator('#maincontainer li').getByRole('link', { name: productType }).click();
            await expect(this.page).toHaveTitle(productType);
        } else {
            await this.page.locator('#maincontainer li').getByRole('link', { name: productType }).click();
            await expect(this.page).toHaveTitle(productType);
        }

        /*        
         Need to do conditions for 'Apparel & accessories', 'Skincare', 'Fragrance', 'Men', 'Hair Care', 'Books'
         */

        await expect(this.page).toHaveURL(productnavigationConfig.URL);
    };

    async addProductToCart(productName) {
        await this.page.getByRole('link', { name: productName }).click();
        const productViewPage = new ProductViewPage(this.page);
        const productBasketPage = productViewPage.addProductToCart(productName);
        return productBasketPage;
    };

    async buyProduct(productName) {
        const productBasketPage = await this.addProductToCart(productName);
        const checkoutConfirmationPage = await productBasketPage.clickCheckoutProduct1();
        const checkoutSuccessPage = await checkoutConfirmationPage.clickConfirmOrderButton();
        await checkoutSuccessPage.validateOrderSuccessMessage();
        await checkoutSuccessPage.clickContinueButton();

    }

    async toggleProductView(view) {
        view === 'list' ? await this.page.locator(listViewButton).click() : await this.page.locator(gridViewButton).click();
    };






};

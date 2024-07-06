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
import logger from '../../utils/winston-logger/logger-util';


export class ProductNavigationPage {

    constructor(page) {
        this.page = page;
    };

    async switchToProduct(productCategory, productType) {
        await this.page.locator('#categorymenu').getByRole('link', { name: productCategory }).click();
        logger.info(`Selected Product Category: ${productCategory}`);
        await expect(this.page).toHaveTitle(productCategory);
        if (productType && productCategory === 'Makeup' && ['Cheeks', 'Eyes', 'Face', 'Lips', 'Nails', 'Value Sets'].includes(productType)) {
            await this.page.locator('#maincontainer li').getByRole('link', { name: productType }).click();
            logger.info(`Selected Product Type: ${productType}`);
            await expect(this.page).toHaveTitle(productType);
        } else {
            await this.page.locator('#maincontainer li').getByRole('link', { name: productType }).click();
            logger.info(`Selected Product Type: ${productType}`);
            await expect(this.page).toHaveTitle(productType);
        }

        /*        
         Need to do conditions for 'Apparel & accessories', 'Skincare', 'Fragrance', 'Men', 'Hair Care', 'Books'
         */

        await expect(this.page).toHaveURL(productnavigationConfig.URL);
        logger.info(`Validated to product category URL!`);
    };

    async addProductToCart(productName) {
        await this.page.getByRole('link', { name: productName }).click();
        const productViewPage = new ProductViewPage(this.page);
        const productBasketPage = productViewPage.addProductToCart(productName);
        logger.info(`Added ${productName} to cart`);
        return productBasketPage;
    };

    async buyProduct(productName) {
        const productBasketPage = await this.addProductToCart(productName);
        const checkoutConfirmationPage = await productBasketPage.clickCheckoutProduct1();
        logger.info(`Checked out the product: ${productName}`);
        const checkoutSuccessPage = await checkoutConfirmationPage.clickConfirmOrderButton();
        logger.info(`Ordered the product: ${productName}`);
        await checkoutSuccessPage.validateOrderSuccessMessage();
        logger.info(`Validated order success message for product: ${productName}`);
        await checkoutSuccessPage.clickContinueButton();
        logger.info(`Clicked on continue button`);

    }

    async toggleProductView(view) {
        view === 'list' ? await this.page.locator(listViewButton).click() : await this.page.locator(gridViewButton).click();
        logger.info(`Toggled view to ${view}`);
    };






};

import {test} from '@playwright/test';
import { HomePage } from "../../page-objects/homepage/homepage-page-object";
import { LoginPage } from "../../page-objects/login/login-page-object";
import logger from '../../utils/winston-logger/logger-util';
import { DashboardPage } from '../../page-objects/dashboard/dashboard-page-object';
import { ProductNavigationPage } from '../../page-objects/products/product-navigation-page-object';

const productCategory = 'Makeup';
const productType = 'Face';
const productName = 'Delicate Oil-Free Powder Blush';

test('Add Makeup Product @smoke', async({page})=>{
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const productNavigationPage = new ProductNavigationPage(page);

    await test.step('Login as Default Login', async () => {
        await page.goto('/');
        logger.info(`Navigated to ${await page.url()}`);
        await homePage.openLoginOrRegistrationPage();
        await loginPage.login(process.env.USERNAME, process.env.PASSWORD);
        logger.info('Entered username and password');
        dashboardPage.verifyWelcomeMessage();
    });

    await test.step('Navigating to Makeup products page',async () => {
        // await productNavigationPage.switchToProduct(productCategory);
        await productNavigationPage.switchToProduct(productCategory, productType)
        await productNavigationPage.toggleProductView('grid');
    });

    await test.step(`Adding ${productName} to cart`,async () => {
        await productNavigationPage.addProductToCart(productName);
    });

})
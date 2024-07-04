import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/homepage/homepage-page-object';
import {
    priceText,
} from '../../pages/products/special-offer-products-page';
import { currencyConfig } from '../../page-config/page-config';


test('Currency Changing Test @sanity @social-links', async ({ page }) => {
    const homePage = new HomePage(page);

    await test.step('Opening Special Offers Page', async () => {
        await page.goto('/');
        await homePage.navigateSpecialOffersPage();
    });

    await test.step(`Verifying Euro Switch and currency symbol ${currencyConfig.CURRENCY_SYMBOL_EUR}`, async () => {
        await homePage.switchCurrencyEuro();
        await expect.soft(page).toHaveURL(currencyConfig.URL_EUR);
        const prices = await page.locator(priceText).all();
        for(const price of prices) {
            await expect.soft(price).toContainText(currencyConfig.CURRENCY_SYMBOL_EUR).catch((error)=> {
                logger.error(`currency value doesn't contain ${currencyConfig.CURRENCY_SYMBOL_EUR}`);
                logger.error(error);
                throw error});
        }
    });

    await test.step(`Verifying Sterling Pound Switch and currency symbol ${currencyConfig.CURRENCY_SYMBOL_GBP}`, async () => {
        await homePage.switchCurrencyPoundSterling();
        await expect.soft(page).toHaveURL(currencyConfig.URL_GBP);
        const prices = await page.locator(priceText).all();
        for(const price of prices) {
            await expect.soft(price).toContainText(currencyConfig.CURRENCY_SYMBOL_GBP).catch((error)=> {
                logger.error(`currency value doesn't contain ${currencyConfig.CURRENCY_SYMBOL_GBP}`);
                logger.error(error);
                throw error});
        }
    });

    await test.step(`Verifying US Dollar Switch and currency symbol ${currencyConfig.CURRENCY_SYMBOL_USD}`, async () => {
        await homePage.switchCurrencyUSDollar();
        await expect.soft(page).toHaveURL(currencyConfig.URL_USD);
        const prices = await page.locator(priceText).all();
        for(const price of prices) {
            await expect.soft(price).toContainText(currencyConfig.CURRENCY_SYMBOL_USD).catch((error)=> {
                logger.error(`currency value doesn't contain ${currencyConfig.CURRENCY_SYMBOL_USD}`);
                logger.error(error);
                throw error});
        }
    });

})

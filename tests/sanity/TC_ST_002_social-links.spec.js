import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/homepage/homepage-page-object';
import {
    facebookConfig,
    twitterConfig,
    linkedinConfig
} from '../../page-config/page-config';


test('Social Links in Home Page Test @sanity @social-links', async ({ page }) => {
    const homePage = new HomePage(page);
    var facebookPage;
    var twitterPage;
    var linkedinPage;

    await test.step('Opening Landing Page', async () => {
        await page.goto('/');
    });

    await test.step('Verifying Facebook Link', async () => {
        facebookPage = await homePage.openFacebookSocialLink();
        await expect.soft(facebookPage.page).toHaveURL(facebookConfig.URL);
        await expect.soft(facebookPage.page).toHaveTitle(facebookConfig.TITLE);
        // await facebookPage.page.close(); //close facebook tab if not needed

    });

    await test.step('Verifying Twitter Link', async () => {
        twitterPage = await homePage.openTwitterSocialLink();
        await expect.soft(twitterPage.page).toHaveTitle(twitterConfig.TITLE);
        await expect.soft(twitterPage.page).toHaveURL(twitterConfig.URL);
        // await twitterPage.page.close(); //close twitter tab if not needed

    });

    await test.step('Verifying LinkedIn Link', async () => {
        linkedinPage = await homePage.openLinkedinSocialLink();
        await expect.soft(linkedinPage.page).toHaveTitle(linkedinConfig.TITLE);
        await expect.soft(linkedinPage.page).toHaveURL(linkedinConfig.URL);
    });

})

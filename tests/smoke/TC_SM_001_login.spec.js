// @ts-check
import {test, expect} from '@playwright/test';
import {LoginPage} from '../../page-objects/login/login-page-object';
import logger from '../../utils/winston-logger/logger-util';
import { HomePage } from '../../page-objects/homepage/homepage-page-object';


test('Login Test @smoke', async({page})=>{
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await test.step('Opening Login Page', async () => {
        await page.goto('/');
        logger.info(`Navigated to ${await page.url()}`);
        await homePage.openLoginOrRegistrationPage();
    });

    await test.step('Enter username and password', async () => {
        await loginPage.login(process.env.USERNAME, process.env.PASSWORD);
        logger.info('Entered username and password');

    });

    await test.step('Validate dashboard', async () => {  
        await expect(page).toHaveURL(/.*account\/account/).catch((error)=> {logger.error(error); throw error});      
        // await expect(page).toHaveURL('*/dashboard/').catch((error)=> {logger.error(error); throw error});
        logger.info('Successfully navigated to Dashboard page');
    });

})

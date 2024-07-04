import { expect } from "@playwright/test";
import logger from '../../utils/winston-logger/logger-util';
import { DashboardPage } from "../dashboard/dashboard-page-object";
import {
    usernameTxt,
    passwordTxt,
    loginBtn,
    forgotPasswordLink,
    forgotLoginLink,
} from '../../pages/login/login-page';
import { loginConfig, dashboardConfig, forgotpasswordConfig, forgotloginConfig } from "../../page-config/page-config";


export class LoginPage {

    constructor(page) {
        this.page = page;
    };

    async login(username, password) {
        await expect(this.page).toHaveURL(loginConfig.URL);
        await this.page.locator(usernameTxt).fill(username);
        await this.page.locator(passwordTxt).fill(password);
        await this.page.locator(loginBtn).click();
        await expect(this.page).toHaveURL(dashboardConfig.URL);
        logger.info('Successfully navigated to Dashboard page');
        return new DashboardPage(this.page);
    };

    async clickForgotPasswordLink() {
        await this.page.locator(forgotPasswordLink).click();
        await expect(this.page).toHaveURL(forgotpasswordConfig.URL);
        logger.info('Navigated to password reset page');
    }

    async clickForgotLoginLink() {
        await this.page.locator(forgotLoginLink).click();
        await expect(this.page).toHaveURL(forgotloginConfig.URL);
        logger.info('Navigated to login reset page');
    }





};

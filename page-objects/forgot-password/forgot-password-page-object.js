import { expect } from "@playwright/test";
import logger from "../../utils/winston-logger/logger-util";
import {
    loginName,
    forgotEmail,
    backBtn,
    continueBtn,
    resetSuccessMessage,
    closeResetSuccessMessageButton,
} from '../../pages/forgot-password/forgot-password-page';
import { forgotpasswordConfig, loginConfig } from "../../page-config/page-config";

export class ForgotPasswordPage {

    constructor(page) {
        this.page = page;
    };

    async resetPassword(username, email) {
        await expect(this.page).toHaveURL(forgotpasswordConfig.URL);
        await this.page.locator(loginName).fill(username);
        await expect(this.page.locator(loginName)).toHaveValue(username);
        await this.page.locator(forgotEmail).fill(email);
        await expect(this.page.locator(forgotEmail)).toHaveValue(email);
        await this.page.locator(continueBtn).click();
        await expect(this.page.locator(resetSuccessMessage)).toContainText(forgotpasswordConfig.RESET_PASSWORD_MESSAGE);
        await this.page.locator(closeResetSuccessMessageButton).click();
        await expect(this.page).toHaveURL(loginConfig.URL);
        logger.info('Reset Password link sent successfully');
    }

    async goBackToLoginPage() {
        await this.page.locator(backBtn).click();
        await expect(this.page).toHaveURL(loginConfig.URL);
    }


};

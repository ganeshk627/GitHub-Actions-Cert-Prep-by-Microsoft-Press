import { expect } from "@playwright/test";

import {
    emailInput,
    passwordInput,
    loginButton,
} from '../../../pages/homepage/social-links/facebook-page';


export class FacebookPage {

    constructor(page) {
        this.page = page;
    };

    async loginFacebook(email = 'dummy', password = 'dummy') {
        await this.page.locator(emailInput).fill(email);
        await this.page.locator(passwordInput).fill(password);
        // await this.page.locator(loginButton).click();
    }





};

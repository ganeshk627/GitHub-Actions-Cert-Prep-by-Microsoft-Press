import { expect } from "@playwright/test";

import {
    signInButton,
} from '../../../pages/homepage/social-links/twitter-page';


export class TwitterPage {

    constructor(page) {
        this.page = page;
    };

    async loginTwitter(email = 'dummy', password = 'dummy') {
        await this.page.locator(signInButton).click();
    }





};

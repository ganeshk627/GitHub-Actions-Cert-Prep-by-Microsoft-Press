import { expect } from "@playwright/test";
import logger from "../../utils/winston-logger/logger-util";

import {
    loginOrRegisterLink,
    headerSocialLinks,
    footerSocialLinks,
    facebookLink,
    twitterLink,
    linkedInLink,
} from '../../pages/homepage/homepage-page';

import {
    facebookConfig,
    homepageConfig,
    linkedinConfig,
    loginConfig,
    twitterConfig
} from "../../page-config/page-config";

import { FacebookPage } from "./social-links/facebook-page-object";
import { TwitterPage } from "./social-links/twitter-page-object";
import { HeaderFooterPage } from "../header-footer/header-footer-page-object";

export class HomePage extends HeaderFooterPage {

    constructor(page) {
        super(page);
        this.page = page;
    };

    async openLoginOrRegistrationPage() {
        await this.page.locator(loginOrRegisterLink).click();
        await expect(this.page).toHaveURL(loginConfig.URL);
        logger.info('Login page opened');
    }

    async openFacebookSocialLink(header = true) {
        const facebookLinkPromise = this.page.context().waitForEvent('page').catch((error)=> {
            logger.error('facebook page not opened!');
            logger.error(error);
            throw error}
            );
        await this.page.locator(header ? headerSocialLinks : footerSocialLinks).locator(facebookLink).click();
        logger.info('facebook link clicked');
        const facebookPage = await facebookLinkPromise;
        await facebookPage.waitForLoadState();
        logger.info('facebook link opened');
        return new FacebookPage(facebookPage);
    }

    async openTwitterSocialLink(header = true) {
        const twitterLinkPromise = this.page.context().waitForEvent('page').catch((error)=> {
            logger.error('twitter page not opened!');
            logger.error(error);
            throw error}
            );
        await this.page.locator(header ? headerSocialLinks : footerSocialLinks).locator(twitterLink).click();
        logger.info('twitter link clicked');
        const twitterPage = await twitterLinkPromise;
        await twitterPage.waitForLoadState();
        logger.info('twitter link opened');
        return new TwitterPage(twitterPage);
    }

    async openLinkedinSocialLink(header = true) {
        const linkedinPromise = this.page.context().waitForEvent('page').catch((error)=> {
            logger.error('linkedin page not opened!');
            logger.error(error);
            throw error}
            );
        await this.page.locator(header ? headerSocialLinks : footerSocialLinks).locator(linkedInLink).click();
        logger.info('linkedin link clicked');
        const linkedinPage = await linkedinPromise;
        await linkedinPage.waitForLoadState();
        // await this.page.waitForLoadState();
        logger.info('linkedin link opened');
        return this;
    }

};

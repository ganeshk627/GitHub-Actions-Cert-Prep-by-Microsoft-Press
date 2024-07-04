import { expect } from "@playwright/test";
import {
    continueButton,
    backButton,
} from '../../../pages/products/checkout/checkout-payment-page';
import {
    checkoutpaymentConfig,
    checkoutconfirmationConfig,
} from '../../../page-config/page-config';

export class CheckoutPaymentPage {

    constructor (page) {
        this.page = page;
    };   

    async clickContinueButton() {
        await expect(this.page).toHaveURL(checkoutpaymentConfig.URL)
        await this.page.locator(continueButton).click();
    };

    async clickBackButton(){
        await expect(this.page).toHaveURL(checkoutpaymentConfig.URL)
        await this.page.locator(backButton).click();
        await expect(this.page).toHaveURL(checkoutconfirmationConfig.URL)
    };

};

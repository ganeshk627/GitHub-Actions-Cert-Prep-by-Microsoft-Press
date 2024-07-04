import { expect } from "@playwright/test";
import {
    welcomeMessage,
    addressBookContacts,
    orderHistory,
    downloads,
    transactionHistory
} from '../../pages/dashboard/dashboard-page'

import { dashboardConfig } from "../../page-config/page-config";


export class DashboardPage {

    constructor(page) {
        this.page = page;
    };

    async verifyWelcomeMessage() {
        // await expect(this.page.locator(welcomeMessage)).toContainText('Welcome back', { timeout: 5000 });
        await expect(this.page.locator(welcomeMessage)).toHaveText(dashboardConfig.WELCOME_MESSAGE, { timeout: 5000 });
    }

    async getAddressBookContacts() {
        return await this.page.locator(addressBookContacts).textContent();
    }

};

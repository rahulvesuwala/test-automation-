import config from '../../playwright.config';
import { expect, Page } from "@playwright/test";
import { TextView, Button, SelectorType, TextInput } from '@aveone/playwright';
import * as path from 'path';
import Base from "./Base";

const expectedErrorMessage: String = "Error: Oops! It seems like the street address for one or more records couldn't be verified. To ensure accurate processing, please double-check the address information or remove it and re-upload the file. Alternatively, you may click \"Proceed\" to continue with enrichment. Invalid addresses will include null values for enriched columns."

class Dashboard extends Base {


    page: Page
    private addressRowsOnEnrichedTable: any[]; // Declare the variable here

    constructor(page: Page) {
        super(page);
        this.page = page
    }

    /**
     * Navigates to the dashboard page.
     */
    async navigateToHomePage() {
        await super.goTo(config.use?.baseURL);
    }

    async verifyUserAbleToSearch(){
        let pageCount = 5;

        while (pageCount > 0) {
            //use the mouse to scroll down with the space bar
            await this.page.mouse.wheel(0, 100);
            //move the mouse a bit too
            await this.page.mouse.move(20, 40);
            //wait a second to see the page
            await this.page.waitForTimeout(3000);
            //find the next button
            // const nextButton = await page.$("text='next'");
            // //if it's visible, click on it
            // if (nextButton && await nextButton.isVisible()) {
            //     await nextButton.click();
            //     pageCount--;
            //     await page.waitForTimeout(1000);
            // }
        }
    }

 }

export default Dashboard;  

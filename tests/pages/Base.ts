import { Page } from "@playwright/test";
import { Browser } from '@aveone/playwright';

class BasePage {
    url: string;
    page: Page
    browser: Browser

    constructor(page: Page) {
        this.page = page
        this.url = ""
        this.browser = new Browser(page)
    }

    async goTo(url: string | null = null) {
        try {
            if (!url) {
                url = this.url
            }
            await this.browser.navigate(url)
        } catch (error) {
            console.error(error)
        }
    }

    async navigateBack() {
        await this.browser.navigateBack()
    }

    async currentUrl() {
        return await this.browser.getCurrentUrl()
    }
}

export default BasePage;

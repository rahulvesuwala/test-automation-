import { Browser, BrowserContext, Page } from 'playwright'
import test from '@playwright/test'
import BrowserFactory from "../Browsers/BrowserFactory"
import AllPages from "../pages/AllPages"

require('dotenv').config();

test.describe('DPE Testcases', () => {
    let context: BrowserContext | undefined,
        browser: Browser | undefined,
        allpages: AllPages | undefined,
        page: Page | undefined,
        email: string | undefined,
        password: string | undefined,
        uqUsername: string | undefined,
        uqPassword: string | undefined



    test.beforeAll('Create Browser', async () => {
        browser = await BrowserFactory.createBrowser()
        page = await browser.newPage()
        allpages = new AllPages(page)
        await page.setViewportSize({ width: 1920, height: 1080 })
        await ({ width: 1920, height: 1080 });
        await allpages?.home.navigateToHomePage()

    })

    test.beforeEach('Open Dashboard', async () => {

    })

    test.afterAll('Close Browser', async () => {
        if (page) {
            await page.close()
        }
    })

    test('Verify that user should able to serach in google.', async () => {
        await allpages?.home.verifyUserAbleToSearch()

    })
})

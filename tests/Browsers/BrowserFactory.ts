import { chromium, webkit, firefox, Browser, BrowserContext } from "playwright";

import config from "../../playwright.config";

class BrowserFactory {

    /**
     * Creates a browser instance based on the configuration settings.
     * @returns A Promise resolving to the created browser instance.
     */
    static async createBrowser() {
        const browser = await this.createDriverFromBrowserType(
            config.use?.browserName,
            config.use?.headless
        )
        return browser
    }
    // static async createBrowser() {
    //     const browserName = config.use?.browserName; // Null check for config.use
    //     const isHeadless = config.use?.headless; // Null check for config.use
    
    //     if (!browserName || !isHeadless) {
    //         throw new Error("Browser name or headless mode is not specified in the configuration.");
    //     }
    
    //     const browser = await this.createDriverFromBrowserType(browserName, isHeadless);
    //     return browser;
    // }
    

    /**
     * Creates a browser instance based on the specified browser type and headless mode.
     * @param browserType - The type of browser to create.
     * @param isHeadless - Whether to launch the browser in headless mode.
     * @returns A Promise resolving to the created browser instance.
     */
    static async createDriverFromBrowserType(browserType: string, isHeadless: boolean): Promise<Browser> {
        console.info(`Creating Driver from given browser: ${browserType} with Headless mode: ${isHeadless}`)
        switch (browserType) {
            case 'chromium':
                return await this.createChromiumBrowser(isHeadless)
            case 'webkit':
                return await this.createWebkitBrowser(isHeadless);
            case 'firefox':
                return await this.createFireffoxBrowser(isHeadless)
            default:
                const message = "User has not selected any browser to run automation tests upon!"
                console.log(message);
                throw new Error(message)
        }
    }

    /**
     * Creates a Chromium browser instance with the specified headless mode.
     * @param isHeadless - Whether to launch Chromium in headless mode.
     * @returns A Promise resolving to the created Chromium browser instance.
     */
    static async createChromiumBrowser(isHeadless: boolean): Promise<Browser> {
        const launchOptions = {
            headless: isHeadless,
            args: ['--start-maximized']

        };
        const browser = await chromium.launch(launchOptions)
        await browser.newContext()
        return browser
    }

    /**
     * Creates a Firefox browser instance with the specified headless mode.
     * @param isHeadless - Whether to launch Firefox in headless mode.
     * @returns A Promise resolving to the created Firefox browser instance.
     */
    static async createFireffoxBrowser(isHeadless: boolean): Promise<Browser> {
        const launchOptions = {
            headless: isHeadless,
            args: ['--kisok']

        }
        const browser = await firefox.launch(launchOptions)
        await browser.newContext()
        return browser
    }

    /**
     * Creates a WebKit browser instance with the specified headless mode.
     * @param isHeadless - Whether to launch WebKit in headless mode.
     * @returns A Promise resolving to the created WebKit browser instance.
     */
    static async createWebkitBrowser(isHeadless: boolean): Promise<Browser> {
        const launchOptions = {
            headless: isHeadless,
        }
        try {
            const browser = await webkit.launch(launchOptions)
            await browser.newContext()
            return browser
        } catch (error) {
            console.error(`Error creating Webkit browser: ${error}`)
            throw error
        }
    }
}

export default BrowserFactory
import { chromium, webkit, firefox, Browser } from 'playwright';
import config from '../../playwright.config';

class BrowserFactory {

  /**
   * Creates a new Playwright browser instance based on configuration.
   * @returns {Promise<import('playwright').Browser>} The created browser instance.
   */
  static async createBrowser(): Promise<Browser> {
    const browser = await this.createDriverFromBrowserType(
      config.use?.browserName,
      config.use?.headless
    );
    return browser;
  }

  /**
   * Creates a Playwright browser instance based on the provided browser type.
   * @param {string} browserType - The type of browser to create (e.g., 'chrome', 'firefox', 'webkit').
   * @param {boolean} isHeadless - Whether the browser should be launched in headless mode.
   * @returns {Promise<import('playwright').Browser>} The created browser instance.
   * @throws {Error} Throws an error if an unsupported browser type is provided.
   */
  static async createDriverFromBrowserType(
    browserType: string,
    isHeadless: boolean
  ): Promise<Browser> {
    console.info(
      `Creating Driver from given browser: ${browserType} with Headless mode: ${isHeadless}`
    );
    switch (browserType) {
      case 'chromium':
        return await this.createChromiumBrowser(isHeadless);
      case 'webkit':
        return await this.createWebkitBrowser(isHeadless);
      case 'firefox':
        return await this.createFireffoxBrowser(isHeadless);
      default:
        const message = "User has not selected any browser to run automation tests upon!"
        console.log(message);
        throw new Error(message);
    }
  }

  /**
  * Creates a Chromium browser instance.
  * @param {boolean} isHeadless - Whether the browser should be launched in headless mode.
  * @returns {Promise<import('playwright').Browser>} The created browser instance.
  */
  static async createChromiumBrowser(isHeadless: boolean): Promise<Browser> {
    const launchOptions = {
      headless: isHeadless,
      args: ['--start-maximized']
    }
    try {
      const browser = await chromium.launch(launchOptions);
      const context = await browser.newContext({ viewport: null });
      const page = await context.newPage();
      return { browser, context, page };
    } catch (error) {
      console.error("Error creating Chrome browser: ", error);
      throw error;
    }
  }

  /**
  * Creates a Firefox browser instance.
  * @param {boolean} isHeadless - Whether the browser should be launched in headless mode.
  * @returns {Promise<import('playwright').Browser>} The created browser instance.
  */
  static async createFireffoxBrowser(isHeadless: boolean): Promise<Browser> {
    const launchOptions = {
      headless: isHeadless,
      args: ['--kiosk'],
    };
    const browser = await firefox.launch(launchOptions);
    const context = await browser.newContext({ viewport: null });
    const page = await context.newPage();
    return { browser, context, page };
  }

  /**
  * Creates a WebKit browser instance.
  * @param {boolean} isHeadless - Whether the browser should be launched in headless mode.
  * @returns {Promise<import('playwright').Browser>} The created browser instance.
  * @throws {Error} Throws an error if WebKit browser creation fails.
  */
  static async createWebkitBrowser(isHeadless: boolean): Promise<Browser> {
    const launchOptions = {
      headless: isHeadless,
    };
    try {
      const browser = await webkit.launch(launchOptions);
      const context = await browser.newContext({ viewport: null });
      const page = await context.newPage();
      return { browser, context, page };
    } catch (error) {
      console.error(`Error creating Webkit browser: ${error}`);
      throw error;
    }
  }
}

export default BrowserFactory;

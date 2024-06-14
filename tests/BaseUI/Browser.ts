import { BrowserContext, Locator, Page } from "@playwright/test";
import SelectorType from "./SelectorType";

class Browser {
    readonly page: Page
    
    constructor(page: Page) {
        this.page = page
    }

    /**
     * Waits until the specified element becomes both visible and enabled within a given timeout period.
     * @param selectorType The type of selector to be used (e.g., 'xpath', 'css', etc.).
     * @param locator The locator string for the element.
     * @param timeout The maximum time to wait for the element to become visible and enabled (default: 60000 ms).
     * @param pollingInterval The interval at which to check for the element's visibility and enabled state (default: 500 ms).
     * @returns A Promise that resolves to true if the element becomes visible and enabled within the timeout, otherwise throws an error.
     */
    async waitUntilElementVisibleAndEnabled(selectorType: SelectorType, locator: string, timeout: number = 60000, pollingInterval: number = 500): Promise<boolean> {
        const startTime = Date.now();
        while (Date.now() - startTime < timeout) {
            try {
                const element = await this.findBySelectorType(selectorType, locator);
                const [isVisible, isEnabled] = await Promise.all([element.isVisible(), element.isEnabled()]);
                if (isVisible && isEnabled) {
                    return true;
                }
            } catch (error) {
                console.error(`Element is not visible`);
            }
            await this.delay(pollingInterval);
        }
        throw new Error(`Element not visible and enabled within ${timeout} ms.`);
    }

    /**
     * Finds elements based on the provided selector type and locator.
     * @param selectorType The type of selector to be used.
     * @param locator The locator string for the element.
     * @param multipleElements Indicates whether multiple elements should be found (default: false).
     * @returns A Promise that resolves to the located element(s).
     * @throws Error if the provided selector type is unsupported.
     */
    async findBySelectorType(selectorType: SelectorType, locator: string, multipleElements: boolean = false): Promise<Locator> {
        switch (selectorType) {
            case SelectorType.CSS:
                return this.findBySelector(locator, multipleElements);
            case SelectorType.XPATH:
                return this.findBySelector(locator);
            case SelectorType.TEXT:
                return this.findByText(locator);
            case SelectorType.LABEL:
                return this.findByLabel(locator);
            case SelectorType.PLACEHOLDER:
                return this.findByPlaceholder(locator);
            case SelectorType.ALTTEXT:
                return this.findByAltText(locator);
            case SelectorType.TITLE:
                return this.findByTitle(locator);
            case SelectorType.TESTID:
                return this.findByTestId(locator);
            default:
                throw new Error('Unsupported selector type')
        }
    }

    /**
     * Finds elements based on the provided CSS selector.
     * @param selector The CSS selector for the element(s) to find.
     * @param multipleElements Indicates whether multiple elements should be found (default: false).
     * @param timeout Optional timeout value.
     * @returns A Promise that resolves to the located element or an array of elements if multipleElements is true.
     * @throws Error if the element(s) cannot be found within the specified timeout.
     */
    async findBySelector(selector: string, multipleElements = false, timeout?: number): Promise<Locator | Locator[]> {
        const optTimeout = timeout || 30000;
        const condition = await this.page.waitForSelector(selector, { timeout: optTimeout });
        try {
            await condition;
            const elements = this.page.locator(selector);
            return multipleElements ? elements.all() : elements;
        } catch (error) {
            throw new Error(`Could not load element with given selector: ${selector}`);
        }
    }

    /**
     * Finds elements based on the provided text.
     * @param text The text content of the element(s) to find.
     * @param multipleElements Indicates whether multiple elements should be found (default: false).
     * @returns A Promise that resolves to the located element or an array of elements if multipleElements is true.
     * @throws Error if the element(s) cannot be found.
     */
    async findByText(text: string, multipleElements = false): Promise<Locator | Locator[]> {
        try {
            const elements = this.page.getByText(text);
            return multipleElements ? elements.all() : elements;
        } catch (error) {
            throw new Error(`Could not load element with given text: ${text}`)
        }
    }

    /**
     * Finds elements based on the provided label.
     * @param label The label content of the element(s) to find.
     * @param multipleElements Indicates whether multiple elements should be found (default: false).
     * @returns A Promise that resolves to the located element or an array of elements if multipleElements is true.
     * @throws Error if the element(s) cannot be found.
     */
    async findByLabel(label: string, multipleElements = false): Promise<Locator | Locator[]> {
        try {
            const elements = this.page.getByLabel(label);
            return multipleElements ? elements.all() : elements;
        } catch (error) {
            throw new Error(`Could not load element with given label: ${label}`);
        }
    }

    /**
     * Finds elements based on the provided placeholder attribute value.
     * @param placeholder The value of the placeholder attribute of the element(s) to find.
     * @param multipleElements Indicates whether multiple elements should be found (default: false).
     * @returns A Promise that resolves to the located element or an array of elements if multipleElements is true.
     * @throws Error if the element(s) cannot be found.
     */
    async findByPlaceholder(placeholder: string, multipleElements = false): Promise<Locator | Locator[]> {
        try {
            const elements = this.page.getByPlaceholder(placeholder);
            return multipleElements ? elements.all() : elements;
        } catch (error) {
            throw new Error(`Could not locate element with given placeholder: ${placeholder}`);
        }
    }

    /**
     * Finds elements based on the provided alt attribute value.
     * @param altText The value of the alt attribute of the element(s) to find.
     * @param multipleElements Indicates whether multiple elements should be found (default: false).
     * @returns A Promise that resolves to the located element or an array of elements if multipleElements is true.
     * @throws Error if the element(s) cannot be found.
     */
    async findByAltText(altText: string, multipleElements = false): Promise<Locator | Locator[]> {
        try {
            const elements = this.page.getByAltText(altText);
            return multipleElements ? elements.all() : elements;
        } catch (error) {
            throw new Error(`Could not load element with given Alt Text: ${altText}`);
        }
    }

    /**
     * Finds elements based on the provided title attribute value.
     * @param title The value of the title attribute of the element(s) to find.
     * @param multipleElements Indicates whether multiple elements should be found (default: false).
     * @returns A Promise that resolves to the located element or an array of elements if multipleElements is true.
     * @throws Error if the element(s) cannot be found.
     */
    async findByTitle(title: string, multipleElements = false): Promise<Locator | Locator[]> {
        try {
            const elements = this.page.getByTitle(title);
            return multipleElements ? elements.all() : elements;
        } catch (error) {
            throw new Error(`Could not load element with given text: ${title}`);
        }
    }

    /**
     * Finds elements based on the provided test ID.
     * @param testId The value of the test ID attribute of the element(s) to find.
     * @param multipleElements Indicates whether multiple elements should be found (default: false).
     * @returns A Promise that resolves to the located element or an array of elements if multipleElements is true.
     * @throws Error if the element(s) cannot be found.
     */
    async findByTestId(testId: string, multipleElements = false): Promise<Locator | Locator[]> {
        try {
            const elements = this.page.getByTestId(testId);
            return multipleElements ? elements.all() : elements;
        } catch (error) {
            throw new Error(`Could not load element with given text: ${testId}`);
        }
    }

    /**
     * Delays execution for the specified amount of time.
     * @param ms The delay duration in milliseconds (default: 1000 ms).
     * @throws Error if there's an error while delaying execution.
     */
    async delay(ms = 1000) {
        try {
            await this.page.waitForTimeout(ms);
        } catch (error) {
            throw new Error(`Error delaying execution: ${error}`);
        }
    }

    /**
     * Random delay with a maximum specified delay time.
     * @param maxDelay The maximum delay time in milliseconds.
     * @throws Error if there's an error while introducing the random delay.
     */
    async randomDelay(maxDelay: number) {
        try {
            const delayTime = Math.floor(Math.random() * maxDelay) + 1;
            await this.delay(delayTime);
        } catch (error) {
            throw new Error(`Error introducing random delay: ${error}`);
        }
    }

    /**
     * Scrolls the specified element into view if it's not already in view.
     * @param selectorType The type of selector to be used.
     * @param locator The locator string for the element.
     * @throws Error if the element cannot be located or an error occurs while scrolling.
     */
    async scrollIntoView(selectorType: SelectorType, locator: string): Promise<void> {
        try {
            const element = await this.findBySelectorType(selectorType, locator);
            await element.scrollIntoViewIfNeeded();
        } catch (error) {
            throw new Error(`Error scrolling element into view: ${error.message || error}`);
        }
    }

    /**
     * Enters the specified text into the input field identified by the provided selector.
     * @param selectorType The type of selector to be used.
     * @param locator The locator string for the input field.
     * @param text The text to be entered into the input field.
     * @param clear Indicates whether to clear the input field before entering text (default: true).
     * @returns The located input field element.
     * @throws Error if the element cannot be located, is not visible or enabled, or an error occurs while entering text.
     */
    async sendKeys(selectorType: SelectorType, locator: string, text: string, clear: boolean = true): Promise<Locator> {
        try {
            const element = await this.findBySelectorType(selectorType, locator);
            await this.waitUntilElementVisibleAndEnabled(selectorType, locator);

            if (clear) {
                await element.clear();
            }
            await element.fill(text);
            return element;
        } catch (error) {
            throw new Error(`Error sending keys to element: ${error.message || error}`);
        }
    }

    /**
     * Sends keys to the specified input field using JavaScript.
     * @param selectorType The type of selector to be used.
     * @param locator The locator string for the input field.
     * @param text The text to be entered into the input field.
     * @returns The located input field element.
     * @throws Error if the element cannot be located, is not visible or enabled, or an error occurs while sending keys.
     */
    async sendKeysJS(selectorType: SelectorType, locator: string, text: string): Promise<Locator> {
        try {
            const element = await this.findBySelectorType(selectorType, locator);
            await this.waitUntilElementVisibleAndEnabled(selectorType, locator);
            await this.delay(200);
            await this.executeJavaScript(`arguments[0].value = ''`, element);
            await this.delay(200);
            const jsScript = `arguments[0].value = '${text}'`;
            await this.executeJavaScript(jsScript, element);
            return element;
        } catch (error) {
            throw new Error(`Error sending keys to element using JavaScript: ${error.message || error}`);
        }
    }

    /**
     * Simulates slow typing into the specified input field.
     * @param selectorType The type of selector to be used.
     * @param locator The locator string for the input field.
     * @param text The text to be typed into the input field.
     * @returns The located input field element.
     * @throws Error if the element cannot be located, is not visible or enabled, or an error occurs while typing.
     */
    async slowType(selectorType: SelectorType, locator: string, text: string) {
        try {
            await this.delay(2000);
            const element = await this.findBySelectorType(selectorType, locator);
            await element.fill('');

            let typedText = '';

            for (let i = 0; i < text.length; i++) {
                const updatedElement = await this.findBySelectorType(selectorType, locator);
                typedText += text[i];
                await updatedElement.press(text[i]);
                const isLastChar = i === text.length - 1;
                const delayTime = isLastChar ? 0 : (text.length - i > 4 ? 25 : 75);
                await this.delay(delayTime);
                await this.randomDelay(50);
            }
            console.info('slowtype text is: ' + typedText);
            return element;
        } catch (error) {
            throw new Error(`Error typing text slowly: ${error}`);
        }
    }

    /**
     * Executes the provided JavaScript code in the context of the current page.
     * @param script The JavaScript code to be executed.
     * @param args Optional arguments to be passed to the JavaScript code.
     * @returns The result of the JavaScript evaluation.
     */
    async executeJavaScript(JavaScript: string, ...args: any[]): Promise<any> {
        const jsOutput = await this.page.evaluate(JavaScript, ...args)
        return jsOutput
    }

    /**
     * Retrieves the inner text of the specified element.
     * @param selectorType The type of selector to be used.
     * @param locator The locator string for the element.
     * @returns The inner text of the located element.
     * @throws Error if the element cannot be located or an error occurs while retrieving the inner text.
     */
    async getText(selectorType: SelectorType, locator: string) {
        try {
            const element = await this.findBySelectorType(selectorType, locator);
            const text = await element.innerText();
            return text;
        } catch (error) {
            throw new Error(`Error getting innter text of element: ${error}`);
        }
    }

    /**
     * Clicks on the specified element using Playwright's built-in click method.
     * @param selectorType The type of selector to be used.
     * @param locator The locator string for the element.
     * @throws Error if the element cannot be located, is not visible or enabled, or an error occurs while clicking.
     */
    async click(selectorType: SelectorType, locator: string) {
        try {
            await this.waitUntilElementVisibleAndEnabled(selectorType, locator);
            const element = await this.findBySelectorType(selectorType, locator);
            await element.click();
        } catch (error) {
            throw new Error(`Error clicking element: ${error}`);
        }
    }

    /**
     * Clicks on the specified element using JavaScript.
     * @param selectorType The type of selector to be used.
     * @param locator The locator string for the element.
     * @throws Error if the element cannot be located, is not visible or enabled, or an error occurs while clicking.
     */
    async clickJS(selectorType: SelectorType, locator: string): Promise<void> {
        try {
            const element = await this.findBySelectorType(selectorType, locator);
            await this.waitUntilElementVisibleAndEnabled(selectorType, locator);
            await this.executeJavaScript("arguments[0].click()", element);
        } catch (error) {
            throw new Error(`Error clicking element using JavaScript: ${error}`);
        }
    }

    /**
     * Performs a hover action on the specified element.
     * @param selectorType The type of selector to be used.
     * @param locator The locator string for the element.
     * @throws Error if the element cannot be located or an error occurs while performing the hover action.
     */
    async hover(selectorType: SelectorType, locator: string) {
        try {
            const element = await this.findBySelectorType(selectorType, locator);
            await element.hover();
        } catch (error) {
            throw new Error(`Error performing hover action: ${error}`);
        }
    }

    /**
     * Retrieves the value of the specified attribute of the element.
     * @param selectorType The type of selector to be used.
     * @param locator The locator string for the element.
     * @param attributeName The name of the attribute to retrieve.
     * @returns The value of the specified attribute.
     * @throws Error if the element cannot be located or an error occurs while getting the attribute value.
     */
    async getAttributeValue(selectorType: SelectorType, locator: string, attributeName: string) {
        try {
            const element = await this.findBySelectorType(selectorType, locator);
            return await element.getAttribute(attributeName);
        } catch (error) {
            throw new Error(`Error getting an attribute value: $${error}`);
        }
    }

    /**
     * Refreshes the current page.
     * @returns A Promise that resolves once the page has been reloaded.
     */
    async refresh(): Promise<void> {
        await this.page.reload()
    }

    /**
     * Checks if the specified element is visible on the page.
     * @param selectorType The type of selector to be used.
     * @param locator The locator string for the element.
     * @returns A Promise that resolves to true if the element is visible, otherwise false.
     * @throws Error if the element cannot be located or an error occurs while checking visibility.
     */
    async isElementVisible(selectorType: SelectorType, locator: string): Promise<boolean> {
        try {
            await this.waitUntilElementVisibleAndEnabled(selectorType, locator);
            const element = await this.findBySelectorType(selectorType, locator);
            return await element.isVisible();
        } catch (error) {
            throw new Error(`Error checking element visibility: ${error}`);
        }
    }

    /**
     * Waits dynamically for the specified element to become visible within a dynamic time frame.
     * @param selectorType The type of selector to be used.
     * @param locator The locator string for the element.
     * @param waitTimeForElement The maximum time to wait for the element to become visible (in milliseconds).
     * @param intervalTime The interval between each check for element visibility (in milliseconds).
     */
    async dynamicWaitForElement(selectorType: SelectorType, locator: string, waitTimeForElement: number, intervalTime: number) {
        try {
            while (!(await this.isElementVisible(selectorType, locator))) {
                await this.delay(intervalTime);
                waitTimeForElement -= intervalTime;
                if (waitTimeForElement < 1) break;
            }
        } catch (error) {
            throw new Error(`Error dynamically waiting for element: ${error.message || error}`);
        }
    }

    /**
     * Navigates the browser to the specified URL.
     * @param url The URL to navigate to.
     * @throws Error if an error occurs during navigation.
     */
    async navigate(url: string) {
        try {
            await this.page.goto(url, {timeout: 60000});
        } catch (error) {
            throw new Error(`Error navigating to ${url}: ${error}`);
        }
    }

    async navigateBack() {
        try {
            await this.page.goBack()
        } catch (error) {
            throw new Error(`Error navigate to go back`)
        }
    }

    /**
     * Waits for the page to fully load within the specified timeout.
     * @param timeout The maximum time to wait for the page to load (in milliseconds).
     * @throws Error if the page doesn't fully load within the specified timeout.
     */
    async waitForPageLoad(timeout: number = 60000) {
        try {
            await this.page.waitForSelector('body', { timeout });
            await this.page.waitForSelector('body', { state: 'visible', timeout });
        } catch (error) {
            throw new Error(`Error waiting for page to load: ${error.message || error}`);
        }
    }

    /**
     * Retrieves the current URL of the page after waiting for the page to fully load.
     * @returns A Promise that resolves to the current URL.
     * @throws Error if an error occurs while retrieving the URL or waiting for the page to load.
     */
    async getCurrentUrl(): Promise<string> {
        try {
            await this.waitForPageLoad();
            return this.page.url();
        } catch (error) {
            throw new Error(`Error getting current URL: ${error.message || error}`);
        }
    }

    async navigateBackToSearchResult() {
        await this.navigateBack()
    }
}

export default Browser;

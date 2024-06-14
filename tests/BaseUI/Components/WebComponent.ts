import SelectorType from "../SelectorType";
import Browser from "../Browser";
import { Page } from "@playwright/test";

class WebComponent {
    selectorType: SelectorType;
    locator: string
    browser: Browser

    constructor(page: Page, selectoryType: SelectorType, locator: string) {
        this.selectorType = selectoryType;
        this.locator = locator;
        this.browser = new Browser(page);
    }

    /**
     * Clicks on the element specified by this.locator.
     * If the element is not visible or the click operation failed for some other reason,
     * it logs an error and falls back to a JavaScript click.
     */
    async click() {
        try {
            await this.browser.scrollIntoView(this.selectorType, this.locator);
            await this.browser.click(this.selectorType, this.locator);
        } catch (error) {
            console.error(error)
            await this.browser.clickJS(this.selectorType, this.locator);
        }
    }

    async slowType(text: string) {
        try {
            await this.browser.slowType(this.selectorType, this.locator, text)
        } catch(error) {
            throw new Error(error)
        }
    }

    /**
     * Finds and returns multiple elements matching the specified selector.
     * @returns An array of located elements.
     * @throws Error if multiple elements cannot be found.
     */
    async findMultipleElements() {
        try {
            const elements = await this.browser.findBySelectorType(this.selectorType, this.locator, true);
            return elements;
        } catch (error) {
            throw new Error(`Unable to found multiple elements: ${error}`);
        }
    }

    /**
     * Retrieves the value of the specified attribute from the element.
     * @param attributeName The name of the attribute to retrieve.
     * @returns The value of the specified attribute.
     * @throws Error if the attribute value cannot be retrieved.
     */
    async getAttribute(attributeName: string) {
        try {
            const attribute = await this.browser.getAttributeValue(this.selectorType, this.locator, attributeName);
            return attribute;
        } catch (error) {
            throw new Error(`Unable to get attribute ${attributeName}`);
        }
    }

    /**
     * Performs a hover action on the element specified by this.locator.
     */
    async hover() {
        try {
            await this.browser.hover(this.selectorType, this.locator)
        } catch (error) {
            throw new Error(`Error performing hover action: ${error}`);
        }
    }

    /**
     * Finds the element specified by this.locator or throws an error if the element cannot be found.
     * @returns The located element.
     * @throws Error if the element cannot be found.
     */
    async findElementOrFailStep() {
        let element;
        try {
            element = await this.browser.findBySelectorType(this.selectorType, this.locator);
            return element;
        } catch (error) {
            console.error(`Error finding element: ${error}`);
            throw error;
        }
    }

    /**
     * Checks if the element specified by this.locator is available and displayed on the page.
     * @returns A boolean indicating whether the element is available and displayed.
     */
    async isAvailableAndDisplayed() {
        try {
            const element = await this.browser.isElementVisible(this.selectorType, this.locator);
            return element;
        } catch (error) {
            return false;
        }
    }

    /**
     * Waits until the element specified by this.locator becomes visible and enabled on the page.
     * @throws Error if the element does not become visible and enabled within the specified timeout.
     */
    async waitUntilElementVisible() {
        try {
            return await this.browser.waitUntilElementVisibleAndEnabled(this.selectorType, this.locator);
        } catch (error) {
            throw new Error(`Element ${this.selectorType} : ${this.locator} is not visible yet`);
        }
    }

    /**
     * Retrieves the value of the specified attribute from the element.
     * @param attributeName The name of the attribute to retrieve.
     * @returns The value of the specified attribute.
     * @throws Error if the attribute value cannot be retrieved.
     */
    async getAttributeValue(attributeName: string) {
        try {
            const attribute = await this.browser.getAttributeValue(this.selectorType, this.locator, attributeName);
            return attribute;
        } catch (error) {
            throw new Error(`Unable to get attribute ${attributeName}: ${error}`);
        }
    }
}

export default WebComponent;

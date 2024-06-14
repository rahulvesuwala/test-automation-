import { Page } from "@playwright/test";
import SelectorType from "../SelectorType";
import WebComponent from "./WebComponent";

class TextView extends WebComponent {
    constructor(page: Page ,selectorType: SelectorType, locator: string) {
        super(page, selectorType, locator)
    }

    /**
     * Retrieve the text value of an element.
     * @return {Promise<string>} the text value of the element
     */
    async getText() {
        try {
            return await this.browser.getText(this.selectorType, this.locator);
        } catch (error) {
            throw new Error(`Unable to get text of an element: ${error}`);
        }
    }

    /**
     * Retrieve the text value of an element using javascript.
     * @return {Promise<string>} the text value of the element
     */
    async getTextByJS() {
        try {
            const element = await this.findElementOrFailStep();
            return await this.browser.executeJavaScript('return arguments[0].innerText', element);
        } catch (error) {
            throw new Error(`Unable to get text of an element using JavaScript: ${error}`);
        }
    }

    /**
     * Retrieve the current url of page.
     * @return {Promise<string>} the url of the page
     */
    async getCurrentUrl() {
        try { 
            return await this.browser.getCurrentUrl();
        } catch (error) {
            throw new Error(`Unable to get current url ${error}`);
        }
    }
}

export default TextView;

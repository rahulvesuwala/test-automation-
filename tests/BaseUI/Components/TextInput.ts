import { Page } from "@playwright/test";
import SelectorType from "../SelectorType";
import WebComponent from "./WebComponent";

class TextInput extends WebComponent {
    constructor(page: Page, selectorType: SelectorType, locator: string) {
        super(page, selectorType, locator)
    }

    /**
     * This function types the given text slowly on the input field of the element
     * @param text - The text to type
     */
    async slowType(text: string) {
        try {
            await this.browser.slowType(this.selectorType, this.locator, text)
        } catch(error) {
            console.error(error)
        }
    }

    /**
     * This method types the provided text into an input field.
     * @param text - The text to type
     */
    async fastType(text: string) {
        try {
            await this.browser.sendKeys(this.selectorType, this.locator, text)
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * This method types the provided text into an input field using JavaScript.
     * @param text - The text to type
     */
    async sendKeysJS(text: string) {
        try {
            await this.browser.sendKeysJS(this.selectorType, this.locator, text)
        } catch (error) {
            console.error(error)
        }
    }
}

export default TextInput;

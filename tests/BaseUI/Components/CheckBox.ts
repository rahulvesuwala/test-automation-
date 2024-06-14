import { Page } from "@playwright/test";
import SelectorType from "../SelectorType";
import WebComponent from "./WebComponent";

class CheckBox extends WebComponent {
    constructor(page: Page, selectorType: SelectorType, locator: string){
        super(page, selectorType, locator)
    }

    /**
     * Clicks on the element.
     */
    async select() {
        await this.browser.click(this.selectorType, this.locator);
    }
}

export default CheckBox;

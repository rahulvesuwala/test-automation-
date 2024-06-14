import { Page } from "@playwright/test";
import Home from "./Dashboard";


/**
 * Represents a collection of all page objects.
 */
class AllPages {
    home: Home
    constructor(page: Page) {
        this.home = new Home(page)

    }

}

export default AllPages

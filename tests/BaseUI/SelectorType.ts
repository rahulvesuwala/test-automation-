/**
 * Enumeration representing different types of selectors that can be used to locate elements.
 * - CSS: CSS selector.
 * - XPATH: XPath selector.
 * - TEXT: Text content selector.
 * - LABEL: Label selector.
 * - PLACEHOLDER: Placeholder attribute selector.
 * - TESTID: Test ID attribute selector.
 * - ALTTEXT: Alt text attribute selector.
 * - TITLE: Title attribute selector.
 * @readonly
 */
enum SelectorType {
    CSS,
    XPATH, 
    TEXT, 
    LABEL,
    PLACEHOLDER,
    TESTID,
    ALTTEXT,
    TITLE
}

export default SelectorType;

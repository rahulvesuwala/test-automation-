# Test demo Test Cases.
This repository contains automated tests for `Test demo` using Playwright with TypeScript.

## Setup Instructions

### 1. Install Dependencies:

• Ensure you have Node.js and npm installed. Then, install the required dependencies:
  ```
  yarn install
  ```
  OR
  ```
  npm install
  ```
• This will install all project dependencies based on the package-lock.json file for consistent dependency management.

### 2. Install Playwright:

• If you haven't installed Playwright globally yet, you can do so using npx:
```
npx playwright install
```
• This will install Playwright and the necessary browser binaries.

### 3. Configure Playwright:

Modify the Playwright configuration in `playwright.config.ts` according to your preferences:
• To change the headless mode, set the headless option to `true` or `false`.
• If you want to change the browser, modify the browserName option. Available options are `chromium`, `firefox`, and `webkit`. (Right now it will work on the chromium browser)


#### How to get token  
When setting up two-factor authentication (2FA), you typically scan a QR code generated by the service with your Google Authenticator app. This QR code contains information including the secret key, which we need to mention on token 

### 5. Run Tests:
• Run the test suite using the following command:
```
npx playwright test
```
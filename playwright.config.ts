import { defineConfig, devices } from '@playwright/test';
// import dotenv from 'dotenv'

// dotenv.config({ path: '.env.local' })
// dotenv.config()

// const BASE_URL = process.env.TEST_MYVOICE_BASE_URL ?? "http://localhost:3000/"

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  use: {
    browserName: 'chromium',
    headless: true,
    baseURL: "https://www.alphabin.co/blog/system-integration-testing-a-complete-guide",
    trace: "on-first-retry",
    screenshot: 'only-on-failure'
  },
  // retries:2,
  testDir: 'tests/spec',
  timeout: 100000,
  expect: {
    timeout: 100000
  },
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI,
  // /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  // /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  // /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',

  // /* Configure projects for major browsers */
  projects: [
    {
      name: 'webkit',
      use: { ...devices['Desktop Chrome'] }
    }
  ]

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

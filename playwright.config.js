// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const { on } = require('events');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html'],['allure-playwright']],
  
  expect: {
    timeout:5000
  },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
  
    trace: 'on-first-retry',
    screenshot : 'on',
    //headless :false
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
     {
      name: 'customchrome',
      use: {
        
        ...devices['Desktop Chrome'],
        viewport: {width:1440, height :900},
        headless : false,
        
      },
      timeout : 30*1000,
    
      expect : {
        timeout:5000
      }
     },
     {
      name: 'iphone16',
      use : {
        browserName: 'webkit',
        ...devices['iPhone 15'],
        headless : false,
        ignoreHTTPSErrors:true,
        video:'on-first-retry',
        
      },
      

     },

    
    
  ],

  
});


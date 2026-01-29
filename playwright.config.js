import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './Tests',
  use: {
    // Specific URL for Option 1 
    baseURL: 'https://www.swifttranslator.com/',
    trace: 'on-first-retry',
    headless: false, // Keep false so you can see the typing happen
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
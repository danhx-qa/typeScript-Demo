import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: './src/tests',
	// testMatch: '**/*.spec.ts',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'html',
	use: {
		headless: false,
		browserName: 'chromium',
		// viewport: { height: 720, width: 1280 },
		viewport: null,
		launchOptions: {
			args: ['--start-maximized'],
		},

		trace: 'on-first-retry',
	},
	timeout: 30000,

	// projects: [
	// 	{
	// 		name: 'chromium',
	// 		use: {
	// 			...devices['Desktop Chrome'],
	// 		},
	// 	},
	// 	{
	// 		name: 'firefox',
	// 		use: { ...devices['Desktop Firefox'] },
	// 	},
	// 	{
	// 		name: 'webkit',
	// 		use: { ...devices['Desktop Safari'] },
	// 	},
	// ],
});

import { chromium, firefox, LaunchOptions, webkit } from '@playwright/test';

export class SetupBrowser {
	browserType: string = 'chrome';
	constructor(browserType: string) {
		this.browserType = browserType;
	}

	async launchBrowser() {
		const headlessEnv = process.env.HEADLESS;
		const option: LaunchOptions = {
			headless: headlessEnv ? headlessEnv === 'true' : false, // Set to true for headless mode
			args: ['--window-size=1920,1080'],
		};
		switch (this.browserType.toUpperCase()) {
			case 'CHROME':
				return await chromium.launch(option);
			case 'FIREFOX':
				return await firefox.launch(option);
			case 'WEBKIT':
				return await webkit.launch(option);
		}
	}
}

import { setDefaultTimeout, BeforeAll, Before, After, AfterAll } from '@cucumber/cucumber';
import { Browser, BrowserContext } from '@playwright/test';
import { SetupBrowser } from '../helper/setup-browser';
import { envSetup } from './envSetup';
import { getEnv } from '../env/env';

let browser: Browser;
let context: BrowserContext;
setDefaultTimeout(60 * 1000); // Set default timeout to 60 seconds
BeforeAll(async () => {
	getEnv(); // Load environment variables
	const browserType = envSetup.BROWSERTYPE?.toUpperCase() || 'CHROME';
	const setupBrowser = new SetupBrowser(browserType);
	const launchedBrowser = await setupBrowser.launchBrowser();
	if (!launchedBrowser) {
		throw new Error('Failed to launch browser');
	}
	browser = launchedBrowser;
});
Before(async () => {
	context = await browser.newContext({
		viewport: null,
	});
	envSetup.PAGE = await context.newPage();
});
After(async () => {
	if (envSetup.PAGE !== undefined) {
		await envSetup.PAGE.close();
	}
	await context.close();
});
AfterAll(async () => {
	await browser.close();
});

import { Page } from '@playwright/test';

export interface IEnvSetup {
	[key: string]: string | unknown;
	PAGE: Page | undefined;
	BROWSERTYPE: string | undefined; // 'chrome' | 'firefox' | 'webkit'
	BASE_URL: string | undefined;
	USER: string | undefined;
	PASSWORD: string | undefined;
}
export const envSetup: IEnvSetup = {
	PAGE: undefined,
	BROWSERTYPE: '',
	BASE_URL: undefined,
	USER: undefined,
	PASSWORD: undefined,
};

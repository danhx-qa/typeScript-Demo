import { expect } from '@playwright/test';
import { envSetup } from '../hooks/envSetup';
import { LeftSidebarMenu } from '../core/common/left-sidebar-menu';

export class DashboardPage extends LeftSidebarMenu {
	async isDashboardPageDisplayed(expectedValue: string) {
		if (envSetup.PAGE != undefined) {
			const pageUrl = await envSetup.PAGE.url();
			// console.log('Current page URL:', pageUrl);
			expect(pageUrl).toContain(expectedValue);
		}
	}
}

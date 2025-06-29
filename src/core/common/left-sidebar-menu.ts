import { expect } from '@playwright/test';
import { envSetup } from '../../hooks/envSetup';
import { BasePage } from './base-page';

export class LeftSidebarMenu extends BasePage {
	async isMenuHighlight(menuText: string, expectedColor: string) {
		if (envSetup.PAGE != undefined) {
			const menu = envSetup.PAGE.locator(`li.active > a:has-text("${menuText}")`);
			const bgColor = await menu.evaluate((el) => {
				return window.getComputedStyle(el).backgroundColor;
			});
			// console.log('Màu nền hiện tại:', bgColor);
			expect(bgColor).toBe(expectedColor);
		}
	}
	async clickToLeftSidebarMenuByText(menuText: string) {
		if (envSetup.PAGE != undefined) {
			await envSetup.PAGE.getByRole('link', { name: menuText, exact: true }).click();
			await envSetup.PAGE.waitForLoadState('load');
		}
	}
}

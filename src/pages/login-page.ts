import { envSetup } from '../hooks/envSetup';

export class LoginPage {
	async navigateToLoginPage() {
		await envSetup.PAGE?.goto(envSetup.BASE_URL!);
		await envSetup.PAGE?.waitForLoadState('networkidle');
		await envSetup.PAGE?.waitForTimeout(1000); // tùy, có thể bỏ nếu không cần delay
	}
	async inputValueToInput(selector: string, value: string) {
		if (envSetup.PAGE != undefined) {
			await envSetup.PAGE.locator(selector).click();
			await envSetup.PAGE.locator(selector).clear();
			await envSetup.PAGE.locator(selector).fill(value);
		}
	}
	async clickToLoginBtn(selector: string) {
		await envSetup.PAGE?.locator(selector).click();
		await envSetup.PAGE?.waitForLoadState('load');
	}
}

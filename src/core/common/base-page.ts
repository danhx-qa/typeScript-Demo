import dayjs from 'dayjs';
import { envSetup } from '../../hooks/envSetup';
import { env } from 'process';

export class BasePage {
	getFormattedDateTime(formatStr: string, options?: { lastDayOfMonth?: boolean }): string {
		const date = options?.lastDayOfMonth ? dayjs().endOf('month') : dayjs();
		return date.format(formatStr);
	}

	async selectItemInCustomDropdown(
		parentLocator: string,
		childLocator: string,
		expectedItemText: string
	) {
		await envSetup.PAGE?.waitForSelector(parentLocator, { state: 'visible' });
		await envSetup.PAGE?.locator(parentLocator).click();
		await envSetup.PAGE?.waitForTimeout(1000);
		// await envSetup.PAGE?.locator(childLocator, {
		// 	has: envSetup.PAGE?.getByText(expectedItemText, { exact: true }),
		// }).click();
		await envSetup.PAGE?.locator(childLocator).getByText(expectedItemText, { exact: true }).click();

		// const listChildItems = await envSetup.PAGE?.locator(childLocator).all();
		// if (listChildItems?.length) {
		// 	for (const childItem of listChildItems) {
		// 		const text = await childItem.textContent();
		// 		// console.log(text);
		// 		if (text?.trim() === expectedItemText) {
		// 			await childItem.scrollIntoViewIfNeeded();
		// 			await childItem.click();
		// 			break;
		// 		}
		// 	}
		// }
	}

	async checkToCheckOrRadio(locator: string) {
		const sharedCheckbox = envSetup.PAGE?.locator(locator);
		if (sharedCheckbox) {
			const isChecked = await sharedCheckbox.isChecked();
			if (!isChecked) {
				await sharedCheckbox.click();
			}
		}
	}
}

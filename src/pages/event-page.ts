import { envSetup } from '../hooks/envSetup';
import { LeftSidebarMenu } from '../core/common/left-sidebar-menu';
import { BasePage } from '../core/common/base-page';
import { expect } from '@playwright/test';
import dayjs from 'dayjs';

export class EventPage extends LeftSidebarMenu {
	async verifyDisplayedWarningMessage(warningMessage: string) {
		if (!envSetup.PAGE) {
			throw new Error('envSetup.PAGE is undefined');
		}
		await expect(envSetup.PAGE.locator(this.WARNING_ALERT)).toBeVisible();
		await expect(envSetup.PAGE.locator(this.WARNING_ALERT)).toHaveText(warningMessage);
	}
	async clickOnConfirmDeleteEventButton() {
		if (!envSetup.PAGE) {
			throw new Error('envSetup.PAGE is undefined');
		}
		await envSetup.PAGE.locator(this.CONFIRM_DELETE_MODEL).click();
	}
	async clickOnDeleteEventButton() {
		if (!envSetup.PAGE) {
			throw new Error('envSetup.PAGE is undefined');
		}
		await envSetup.PAGE.locator(this.DELETE_MODEL).click();
	}
	async isAddEventModalUnDisplayed() {
		if (!envSetup.PAGE) {
			throw new Error('envSetup.PAGE is undefined');
		}
		await expect(envSetup.PAGE.locator(this.ADD_EVENT_MODAL)).toBeHidden();
	}
	async clickOnCloseModelButton() {
		if (!envSetup.PAGE) {
			throw new Error('envSetup.PAGE is undefined');
		}
		await envSetup.PAGE?.locator(this.CLOSE_MODEL).click();
	}
	async clickOutsideModel() {
		if (!envSetup.PAGE) {
			throw new Error('envSetup.PAGE is undefined');
		}
		await envSetup.PAGE.mouse.click(0, 0);
	}
	async verifyDisplayedErrorMessageAtRequiredField(placeholderFiled: string, errorMsg: string) {
		if (!envSetup.PAGE) {
			throw new Error('envSetup.PAGE is undefined');
		}
		await expect(
			envSetup.PAGE.getByPlaceholder(placeholderFiled).locator('..').locator('.help-block')
		).toHaveText(errorMsg);
	}
	async waitForLoadState() {
		if (!envSetup.PAGE) {
			throw new Error('envSetup.PAGE is undefined');
		}
		await envSetup.PAGE.waitForLoadState('load');
	}
	async verifyDetailInformationEvent(
		title: string,
		description: string,
		location: string,
		label?: string
	) {
		if (!envSetup.PAGE) {
			throw new Error('envSetup.PAGE is undefined');
		}
		await expect(envSetup.PAGE.locator(this.EVENT_TITLE_MODEL)).toHaveText(title);
		await expect(envSetup.PAGE.locator(this.EVENT_DESCRIPTION_MODEL)).toHaveText(description);
		await expect(envSetup.PAGE.locator(this.EVENT_LOCATION_MODEL)).toHaveText(location);
	}
	async clickOnEvent(title: string, startDate: string) {
		const locator = `td[data-date='${startDate}'] a.fc-daygrid-event`;
		if (!envSetup.PAGE) {
			throw new Error('envSetup.PAGE is undefined');
		}
		await envSetup.PAGE.locator(locator).getByText(title, { exact: true }).click();
	}
	async waitForLoadTimeout(second: number) {
		await envSetup.PAGE?.waitForTimeout(second * 1000);
	}
	async isEventDisplayedAtCalendar(title: string, startDate: string) {
		const locator = `td[data-date='${startDate}'] a.fc-daygrid-event`;
		if (!envSetup.PAGE) {
			throw new Error('envSetup.PAGE is undefined');
		}
		await expect(envSetup.PAGE.locator(locator)).toHaveText(title);
	}
	async isEventUnDisplayedAtCalendar(startDate: string) {
		const locator = `td[data-date='${startDate}'] a.fc-daygrid-event`;
		if (!envSetup.PAGE) {
			throw new Error('envSetup.PAGE is undefined');
		}
		await expect(envSetup.PAGE.locator(locator)).toHaveCount(0);
	}

	async selectRepeatCheckbox() {
		await this.basePage.checkToCheckOrRadio(this.REPEAT_CHECKBOX);
	}

	async selectOnSharedCheckbox(optionCheckbox: string) {
		await this.basePage.checkToCheckOrRadio(
			`//label[contains(text(),'${optionCheckbox}')]/preceding-sibling::input`
		);
	}

	async selectClientInSelect2(value: string) {
		await this.basePage.selectItemInCustomDropdown(
			this.PARENT_CLIENT_LOCATOR,
			this.CHILD_CLIENT_LOCATOR,
			value
		);
	}

	async enterEventInformationByID(idLocator: string, value: string) {
		const locator = `#${idLocator}`;
		await envSetup.PAGE?.waitForSelector(locator, { state: 'visible' });
		await envSetup.PAGE?.locator(locator).fill(value);
	}

	async enterEventInformationWithIDByJs(idLocator: string, value: string) {
		const locator = `#${idLocator}`;
		await envSetup.PAGE?.waitForSelector(locator, { state: 'visible' });

		await envSetup.PAGE?.evaluate(
			({ id, value }) => {
				const input = document.getElementById(id) as HTMLInputElement;
				if (input) {
					input.value = value;
					input.dispatchEvent(new Event('input', { bubbles: true }));
					input.dispatchEvent(new Event('change', { bubbles: true }));
				}
			},
			{ id: idLocator, value }
		);
	}

	async clickToAddEventButton() {
		await envSetup.PAGE?.waitForSelector(this.ADD_EVENT_BUTTON, { state: 'visible' });
		await envSetup.PAGE?.locator(this.ADD_EVENT_BUTTON).click();
	}

	async isAddEventModalDisplayed(value: string) {
		if (!envSetup.PAGE) {
			throw new Error('envSetup.PAGE is undefined');
		}
		await expect(envSetup.PAGE.locator(this.ADD_EVENT_MODAL)).toHaveText(value);
		await expect(envSetup.PAGE.locator(this.ADD_EVENT_MODAL)).toBeVisible();
	}

	async selectLastDayOfCurrentMonth() {
		await envSetup.PAGE?.locator(this.LAST_DAY_OF_MONTH_AT_CALENDER).click();
	}
	async selectCurrentDayOfCurrentMonth() {
		await envSetup.PAGE?.locator(this.CURRENT_DAY_OF_MONTH_AT_CALENDER).click();
	}

	async clickToNavigateMonthButtonByTime(typeButton: string, timesClick: string) {
		const locator = `button[aria-label="${typeButton}"]`;
		for (let i = 1; i <= parseInt(timesClick); i++) {
			if (envSetup.PAGE != undefined) {
				const button = envSetup.PAGE.locator(`${locator}`);
				await button.click();
			}
		}
	}

	async isCalendarMonthCorrect(formatStr: string, timesClick?: number, typeButton?: string) {
		await envSetup.PAGE?.waitForSelector(this.TITLE_AT_CALENDER, { state: 'visible' });
		const actualText = (await envSetup.PAGE?.locator(this.TITLE_AT_CALENDER).textContent())?.trim();
		let expectedText = '';
		const times = timesClick ?? 0;

		switch (typeButton?.toLowerCase()) {
			case 'next':
				expectedText = dayjs().add(times, 'month').format(formatStr).trim();
				break;

			case 'prev':
				expectedText = dayjs().subtract(times, 'month').format(formatStr).trim();
				break;

			case 'week': {
				const start = dayjs().startOf('week').format(formatStr);
				const end = dayjs().endOf('week').format('MMM D, YYYY');
				expectedText = `${start} – ${end}`;
				break;
			}

			case 'day':
			case 'month':
			default:
				expectedText = dayjs().format(formatStr).trim();
				break;
		}
		expect(actualText).toBe(expectedText);
	}

	async clickButtonByText(nameButton: string) {
		const locator = `//button[text()="${nameButton}"]`;
		await envSetup.PAGE?.waitForSelector(locator, { state: 'visible' });
		await envSetup.PAGE?.locator(locator).click();
	}
	basePage = new BasePage();
	lastDayOfMonth = this.basePage.getFormattedDateTime('YYYY-MM-DD', { lastDayOfMonth: true });
	currentDayOfMonth = this.basePage.getFormattedDateTime('YYYY-MM-DD', { lastDayOfMonth: false });
	private PARENT_CLIENT_LOCATOR = `div[id='s2id_clients_dropdown']`;
	private CHILD_CLIENT_LOCATOR = `//div[@id='select2-drop']//li//div`;
	private ADD_EVENT_BUTTON = `a[class='btn btn-default add-btn']`;
	private ADD_EVENT_MODAL = '#ajaxModalTitle';
	private LAST_DAY_OF_MONTH_AT_CALENDER = `td[data-date='${this.lastDayOfMonth}']`;
	private CURRENT_DAY_OF_MONTH_AT_CALENDER = `td[data-date='${this.currentDayOfMonth}']`;
	private TITLE_AT_CALENDER = '.fc-toolbar-title';
	private REPEAT_CHECKBOX = 'input#event_recurring';
	private EVENT_DETAIL_MODEL = '#ajaxModalTitle';
	private EVENT_TITLE_MODEL = '.mt0.float-start';
	private EVENT_DESCRIPTION_MODEL = '.font-14.text-justify';
	private EVENT_LOCATION_MODEL = `div[class='font-14']`;
	private CLOSE_MODEL = `div[class='modal-dialog modal-lg'] button[aria-label='Close']`;
	private DELETE_MODEL = `#delete_event`;
	private CONFIRM_DELETE_MODEL = `//button[normalize-space()='Yes']`;
	private REJECT_DELETE_MODEL = `//button[normalize-space()='No']`;
	private WARNING_ALERT = '.app-alert-message';
}

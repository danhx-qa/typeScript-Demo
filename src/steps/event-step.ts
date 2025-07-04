import { Given, Then, When } from '@cucumber/cucumber';

import { start } from 'repl';
import { EventPage } from '../pages/event-page';

Given('The user navigates to the {string} screen', async function (menuText: string) {
	const eventPage = new EventPage();
	await eventPage.clickToLeftSidebarMenuByText(menuText);
});

When(
	'The user clicks the {string} button more than {string} times',
	async (typeButton: string, timesClick: string) => {
		const eventPage = new EventPage();
		await eventPage.clickToNavigateMonthButtonByTime(typeButton, timesClick);
	}
);

Then(
	'The calendar should display the correct {string} month {int} with format {string}',
	async (typeButton: string, timesClick: number, formatStr: string) => {
		const eventPage = new EventPage();
		await eventPage.isCalendarMonthCorrect(formatStr, timesClick, typeButton);
		await eventPage.waitForLoadTimeout(5);
	}
);

When('clicks the {string} button', async (nameButton: string) => {
	const eventPage = new EventPage();
	await eventPage.clickButtonByText(nameButton);
	await eventPage.waitForLoadState();
});

When('The user selects the last day of the current month', async () => {
	const eventPage = new EventPage();
	await eventPage.selectLastDayOfCurrentMonth();
});

Then('The Add Event modal should be {string} title displayed', async (value: string) => {
	const eventPage = new EventPage();
	await eventPage.isAddEventModalDisplayed(value);
});

When('The user clicks the Add Event button', async () => {
	const eventPage = new EventPage();
	await eventPage.clickToAddEventButton();
});

When(
	'Enters event information with {string},{string},{string},{string},{string},{string},{string},{string},{string},{string}',
	async (
		title: string,
		startDate: string,
		description: string,
		startTime: string,
		endDate: string,
		endTime: string,
		location: string,
		label: string,
		client: string,
		sharedWith: string
	) => {
		const eventPage = new EventPage();
		await eventPage.enterEventInformationByID('title', title);
		await eventPage.enterEventInformationByID('description', description);
		await eventPage.enterEventInformationWithIDByJs('start_date', startDate);
		await eventPage.enterEventInformationWithIDByJs('start_time', startTime);
		await eventPage.enterEventInformationWithIDByJs('end_date', endDate);
		await eventPage.enterEventInformationWithIDByJs('end_time', endTime);
		await eventPage.enterEventInformationByID('location', location);

		await eventPage.selectClientInSelect2(client);
		await eventPage.selectOnSharedCheckbox(sharedWith);
		await eventPage.selectRepeatCheckbox();
	}
);

Then(
	'The event should be added successfully with {string},{string},{string},{string},{string},{string},{string},{string},{string},{string}',
	async (
		title: string,
		startDate: string,
		description: string,
		startTime: string,
		endDate: string,
		endTime: string,
		location: string,
		label: string,
		client: string,
		sharedWith: string
	) => {
		const eventPage = new EventPage();
		await eventPage.isEventDisplayedAtCalendar(title, startDate);
		await eventPage.clickOnEvent(title, startDate);
		await eventPage.verifyDetailInformationEvent(title, description, location, label);
	}
);

Then(
	'The validation error message should be displayed for the {string} field',
	async (errorMsg: string) => {
		const eventPage = new EventPage();
		await eventPage.verifyDisplayedErrorMessageAtRequiredField('Title', errorMsg);
		await eventPage.verifyDisplayedErrorMessageAtRequiredField('Start date', errorMsg);
	}
);

Then(
	'The event should be added successfully with {string},{string}',
	async function (title: string, startDate: string) {
		const eventPage = new EventPage();
		await eventPage.isEventDisplayedAtCalendar(title, startDate);
		await eventPage.clickOnEvent(title, startDate);
	}
);

When(
	'Enters event information with required field {string},{string}',
	async function (title: string, startDate: string) {
		const eventPage = new EventPage();
		await eventPage.enterEventInformationByID('title', title);
		await eventPage.enterEventInformationWithIDByJs('start_date', startDate);
	}
);

When('The user selects the current day of the current month', async () => {
	const eventPage = new EventPage();
	await eventPage.selectCurrentDayOfCurrentMonth();
});

When('The user clicks outside the Add Event modal', async () => {
	const eventPage = new EventPage();
	await eventPage.clickOutsideModel();
});

When('The user clicks the Close button on the modal', async () => {
	const eventPage = new EventPage();
	await eventPage.clickOnCloseModelButton();
});

Then('The Add Event modal should be {string} title undisplayed', async (value: string) => {
	const eventPage = new EventPage();
	await eventPage.isAddEventModalUnDisplayed();
});

When('The user deletes the event', async () => {
	const eventPage = new EventPage();
	await eventPage.clickOnDeleteEventButton();
	await eventPage.clickOnConfirmDeleteEventButton();
});

Then('A yellow success message {string} should be displayed', async (message: string) => {
	const eventPage = new EventPage();
	await eventPage.verifyDisplayedWarningMessage(message);
});

Then('The event titled {string} should no longer be visible', async (startDate: string) => {
	const eventPage = new EventPage();
	await eventPage.isEventUnDisplayedAtCalendar(startDate);
});

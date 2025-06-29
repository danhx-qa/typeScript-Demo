import { Given, When } from '@cucumber/cucumber';
import { LoginPage } from '../pages/login-page';

Given('Open browser and navigate to the login page', async function () {
	const loginPage = new LoginPage();
	await loginPage.navigateToLoginPage();
});

When('The user click the login button', async () => {
	const loginPage = new LoginPage();
	await loginPage.clickToLoginBtn(`button[type='submit']`);
});

When(
	'The user enter the username {string} and password {string}',
	async function (email: string, password: string) {
		const loginPage = new LoginPage();
		await loginPage.inputValueToInput(`#email`, email);
		await loginPage.inputValueToInput(`#password`, password);
	}
);

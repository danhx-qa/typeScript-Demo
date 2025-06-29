import { Then } from '@cucumber/cucumber';
import { DashboardPage } from '../pages/dashboard-page';

Then(
	'The user should be logged in and redirected to the dashboard successfully',
	async function () {
		const dashboardPage = new DashboardPage();
		await dashboardPage.isDashboardPageDisplayed('/dashboard');
		await dashboardPage.isMenuHighlight('Dashboard', 'rgb(102, 144, 244)');
	}
);

const common = [
	'src/features/**/*.feature',
	'--require-module ts-node/register',
	'--require src/hooks/**/*.ts',
	'--require src/steps/**/*.ts',
	'--format progress-bar',
	'--format json:./src/reports/cucumber-report.json',
	'--format html:./src/reports/cucumber-report.html',
	// '--retry 2',
	// '--retry-tag filter "@bug"',
].join(' ');

module.exports = {
	default: common,
};

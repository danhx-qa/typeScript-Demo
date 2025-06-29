import { envSetup } from '../hooks/envSetup';
import * as dotenv from 'dotenv';
export const getEnv = () => {
	dotenv.config({
		override: true,
		path: __dirname + `/.env.${process.env.NODE_ENV ? process.env.NODE_ENV : 'dev'}`,
	});
	for (const key in process.env) {
		if (key.toUpperCase() in process.env) {
			envSetup[key] = process.env[key.toUpperCase()] as undefined | string;
		}
	}
};

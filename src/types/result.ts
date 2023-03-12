import {Homework} from "./homework";

export interface Result {
	id: string;
	jsonrpc: string;
	result: {
		success: boolean;
		error?: boolean;
	};
}

export interface AuthResult extends Result {
	result: {
		analytics_enabled: Array<any>;
		api_version: number;
		authtoken: string;
		success: boolean;
		user: User;
	}
}

export interface RawTimetableResult extends Result {
	result: {
		requested_date: string;
		showing_from: string;
		showing_to: string;
		success: boolean;
		weeks: any;
	}
}

export interface RawHomeworkResult extends Result{
	result: {
		homework: {
			current: Array<Homework>;
			past: Array<Homework>;
		}
		success: boolean
	}
}

export interface User {
	community_group_id: string;
	establishment_id: string;
	forename: string;
	form_group_id: string;
	gender: string;
	remember_password_permitted: boolean;
	surname: string;
	types: Array<string>;
	username: string;
	year_group_id: string;
}
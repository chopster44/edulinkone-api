export interface RawResult {
	id: string;
	jsonrpc: string;
	result: {
		success: boolean;
		error?: boolean;
	};
}

export interface AuthResult extends RawResult {
	result: {
		analytics_enabled: Array<any>;
		api_version: number;
		authtoken: string;
		success: boolean;
		user: User;
	}
}

export interface RawTimetableResult extends RawResult {
	result: {
		requested_date: string;
		showing_from: string;
		showing_to: string;
		success: boolean;
		weeks: any;
	}
}

export interface RawHomeworkResult extends RawResult{
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
export interface Homework {
	activity: string;
	attachments: Array<any>;
	available_date: string;
	available_text: string;
	cloneable: boolean;
	completed: boolean;
	deletable: boolean;
	due_date: string;
	due_reminder: any;
	due_text: string;
	duration: any;
	employee_received: any;
	format: number;
	icon: string;
	id: string;
	owner_id: string;
	set_by: string;
	source: string;
	status: string;
	subject: string;
	user_type: string;
}
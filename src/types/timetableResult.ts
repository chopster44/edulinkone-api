export interface TimetableResult {
	method: string;
	metrics: {
		sspt: number;
		sspt_us: number;
		st: string;
		uniqid: string;
	};
	requested_date: string;
	showing_from: string;
	showing_to: string;
	success: boolean;
	weeks: [{}];
}

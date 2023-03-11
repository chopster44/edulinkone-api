import {fetchHeaders} from "../types/fetchHeaders";
import {LoginCredentials} from "../types/loginCredentials";
import {TimetableParams} from "../types/timetableParams";
import {TimetableResult} from "../types/timetableResult";

export class Edulink {
	public isAuthenticated: boolean;
	readonly schoolId: string;
	public authToken: string;
	constructor(schoolId: string) {
		this.isAuthenticated = false;
		this.schoolId = schoolId;
	}

	public async Authenticate(credentials: LoginCredentials) {
		const response: any = await fetch(`https://${this.schoolId}.edulinkone.com/api/`,
			{
				headers: { ...fetchHeaders, "X-API-Method": "EduLink.Login" },
				method: "POST",
				body: JSON.stringify({
					id: "1",
					jsonrpc: "2.0",
					method: "EduLink.Login",
					params: credentials,
				}),
			}).then(res => res.json());
		if (!response.result.success) {
			throw new Error(`Login: ${response.result.error ?? 'unknown'}`)
		}
		else {
			this.isAuthenticated = true;
			this.authToken = response.result.authtoken;
		}
		console.log(1);
	}

	public async getTimetable(params: TimetableParams): Promise<TimetableResult> {
		const response: any = await fetch(`https://${this.schoolId}.edulinkone.com/api/`,
			{
				headers: { ...fetchHeaders,"Authorization": `Bearer ${(this.authToken)}`, "X-API-Method": "EduLink.Timetable"},
				method: "POST",
				body: JSON.stringify({
					id: "1",
					jsonrpc: "2.0",
					method: "EduLink.Timetable",
					params: params,
				}),
			}).then(res => res.json());
		if (!response.result.success) {
			throw new Error(`Timetable: ${response.result.error ?? 'unknown'}`);
		} else {
			return response.result;
		}
	}

	public async getHomework(): Promise<any> {
		const response: any = await fetch(`https://${this.schoolId}.edulinkone.com/api/`,
			{
				headers: { ...fetchHeaders, "Authorization": `Bearer ${(this.authToken)}`, "X-API-Method": "EduLink.Homework"},
				method: "POST",
				body: JSON.stringify({
					id: "1",
					jsonrpc: "2.0",
					method: "EduLink.Homework",
					params: {format: 1}
				}),
			}).then(res => res.json());
		if (!response.result.success) {
			throw new Error(`Homework: ${response.result.error ?? 'unknown'}`);
		} else {
			return response.result.homework;
		}
	}
}
import {fetchHeaders} from "../types/fetchHeaders";
import {AuthResult, RawHomeworkResult, Result, RawTimetableResult} from "../types/result";
import {AuthParams, RawHomeworkParams, Params, RawTimetableParams} from "../types/params";

export class Edulink {
	public isAuthenticated: boolean;
	readonly schoolId: string;
	public authToken: string;
	constructor(schoolId: string) {
		this.isAuthenticated = false;
		this.schoolId = schoolId;
	}

	private async request(params: Params): Promise<Result | AuthResult | RawTimetableResult | RawHomeworkResult> {
		const response: Result = await fetch(`https://${this.schoolId}.edulinkone.com/api/`,
			{
				headers: (this.isAuthenticated ? { ...fetchHeaders, "Authorization": `Bearer ${this.authToken}`, "X-API-Method": `EduLink.${params.action}`} : { ...fetchHeaders,  "X-API-Method": `EduLink.${params.action}`}),
				method: "POST",
				body: JSON.stringify({
					id: "1",
					jsonrpc: "2.0",
					method: `EduLink.${params.action}`,
					params: params.data,
				}),
			}).then(res => res.json());
		if (!response.result.success){
			throw new Error(`${params.action}: ${response.result.error ?? 'unknown'}`)
		} else {
			return response;
		}
	}

	public async Authenticate(params: AuthParams) {
		params.action = "Login";
		// @ts-ignore
		const response: AuthResult = await this.request(params);
		this.isAuthenticated = true;
		this.authToken = response.result.authtoken;
	}

	public async getRawTimetable(params: RawTimetableParams): Promise<RawTimetableResult> {
		params.action = "Timetable";
		// @ts-ignore
		return this.request(params);
	}
	public async getRawHomework(params: RawHomeworkParams): Promise<RawHomeworkResult> {
		params.action = "Homework";
		// @ts-ignore
		return this.request(params);
	}
}
import {fetchHeaders} from "../types/fetchHeaders";
import {AuthResult, HomeworkResult, Result, TimetableResult} from "../types/result";
import {AuthParams, HomeworkParams, Params, TimetableParams} from "../types/params";

export class Edulink {
	public isAuthenticated: boolean;
	readonly schoolId: string;
	public authToken: string;
	constructor(schoolId: string) {
		this.isAuthenticated = false;
		this.schoolId = schoolId;
	}

	private async request(params: Params): Promise<Result | AuthResult | TimetableResult | HomeworkResult> {
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
		// @ts-ignore
		const response: AuthResult = await this.request(params);
		this.isAuthenticated = true;
		this.authToken = response.result.authtoken;
	}

	public async getTimetable(params: TimetableParams): Promise<TimetableResult> {
		// @ts-ignore
		return this.request(params);
	}

	public async getHomework(params: HomeworkParams): Promise<HomeworkResult> {
		// @ts-ignore
		return this.request(params);
	}
}
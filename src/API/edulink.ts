import {fetchHeaders} from "../types/fetchHeaders";
import {
	AuthResult, Day,
	Homework,
	HomeworkResult,
	RawHomeworkResult,
	RawResult,
	RawTimetableResult, Week
} from "../types/result";
import {AuthParams, Params, RawHomeworkParams, RawTimetableParams} from "../types/params";

export class Edulink {
	public isAuthenticated: boolean;
	readonly schoolId: string;
	public authToken: string;
	public learner_id: string;
	constructor(schoolId: string, username: string, password: string, establishment_id: number) {
		this.isAuthenticated = false;
		this.schoolId = schoolId;
		this.Authenticate({data: {username, password, establishment_id}});
	}

	private async request(params: Params): Promise<RawResult | AuthResult | RawTimetableResult | RawHomeworkResult> {
		const response: RawResult = await fetch(`https://${this.schoolId}.edulinkone.com/api/`,
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

	private async Authenticate(params: AuthParams) {
		params.action = "Login";
		// @ts-ignore
		const response: AuthResult = await this.request(params);
		this.isAuthenticated = true;
		this.authToken = response.result.authtoken;
		this.learner_id = response.result.user.id;
	}

	public async getRawTimetable(params: RawTimetableParams): Promise<RawTimetableResult> {
		params.action = "Timetable";
		// @ts-ignore
		return await this.request(params);
	}

	public async getThisWeek(): Promise<Week> {
		let rawTimetable: RawTimetableResult = await this.getRawTimetable({data: {date: (new Date).toISOString().split('T')[0], learner_id: this.learner_id}});
		return rawTimetable.result.weeks[0];
	}

	public async getToday(): Promise<Day> {
		//@ts-ignore
		let rawWeek: Week = this.getThisWeek();
		for (let i = 0; i < rawWeek.days.length; i++) {
			if (rawWeek.days[i].date === (new Date).toISOString().split('T')[0]) {
		 		return rawWeek.days[i]
			}
		}
	}
	public async getRawHomework(params: RawHomeworkParams): Promise<RawHomeworkResult> {
		params.action = "Homework";
		// @ts-ignore
		return await this.request(params);
	}

	public async getCurrentHomework(): Promise<HomeworkResult> {
		//@ts-ignore
		let rawHomework: RawHomeworkResult = await this.getRawHomework({data: {format:2}});
		return rawHomework.result.homework.current;
	}

	public async getPastHomework(): Promise<HomeworkResult> {
		//@ts-ignore
		let rawHomework: RawHomeworkResult = await this.getRawHomework({data: {format: 2}});
		return rawHomework.result.homework.past;
	}
}
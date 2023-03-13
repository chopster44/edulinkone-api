import {fetchHeaders} from "../types/fetchHeaders.js";
import {
	AuthResult, Day,
	Homework,
	HomeworkResult,
	RawHomeworkResult,
	RawResult,
	RawTimetableResult, Week
} from "../types/result.js";
import {AuthParams, Params, RawHomeworkParams, RawTimetableParams} from "../types/params.js";
import fetch from "node-fetch";

/**
 * Class for interaction with the Edulink API
 */
export class Edulink {
	/**
	 * a variable representing if the user has authenticated
	 * @type {boolean}
	 */
	public isAuthenticated: boolean;
	/**
	 * the part of the web address which goes before .edulinkone.com
	 * @type {string}
	 */
	readonly schoolId: string;
	/**
	 * the auth token given by edulink allowing for interactions. generated on class creation
	 * @type {string}
	 */
	public authToken: string;
	/**
	 * the name used to identify the user in the edulink backend
	 * @type {string}
	 */
	public learner_id: string;

	private authParams: AuthParams;

	/**
	 * Create an instance of the edulink API helper.
	 * @param {string} schoolId - the part of the web address which goes before .edulinkone.com
	 * @param {string} username - the username used to log in to edulink
	 * @param {string} password - the password used to log in to edulink
	 * @param {number} establishment_id - unknown usage but cannot log in without it
	 */
	constructor(schoolId: string, username: string, password: string, establishment_id: number) {
		this.isAuthenticated = false;
		this.schoolId = schoolId;
		this.authParams = {
			action: "Login",
			data: {
				username: username,
				password: password,
				establishment_id: establishment_id
			}
		}
	}

	/**
	 * Send a request to the edulink API
	 * @param {Params} params - the edulink action and any data being sent in the http request body
	 * @private
	 */
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

	/**
	 * Used to log in to edulink allowing the api to be used.
	 * @private
	 */
	public async Authenticate() {
		// @ts-ignore
		const response: AuthResult = await this.request(this.authParams);
		this.isAuthenticated = true;
		this.authToken = response.result.authtoken;
		this.learner_id = response.result.user.id;
	}

	/**
	 * gets the raw edulink API timetable data
	 * @param {RawTimetableParams} params - takes in the current date and userid/learner_id
	 * @return {RawTimetableResult}
	 */
	public async getRawTimetable(params: RawTimetableParams): Promise<RawTimetableResult> {
		params.action = "Timetable";
		// @ts-ignore
		return await this.request(params);
	}

	/**
	 * gets the data for the week edulink classes as the 'current week'
	 * @return {Week}
	 */
	public async getThisWeek(): Promise<Week> {
		let rawTimetable: RawTimetableResult = await this.getRawTimetable({data: {date: (new Date).toISOString().split('T')[0], learner_id: this.learner_id}});
		return rawTimetable.result.weeks[0];
	}

	/**
	 * gets the data for the day edulink classes as "today"
	 * @return {Day}
	 */
	public async getToday(): Promise<Day> {
		//@ts-ignore
		let rawWeek: Week = this.getThisWeek();
		for (let i = 0; i < rawWeek.days.length; i++) {
			if (rawWeek.days[i].is_current === true) {
		 		return rawWeek.days[i]
			}
		}
	}
	/**
	 * gets the raw edulink API homework data
	 * @param {RawHomeworkParams} params - not sure why, but it wants a number here
	 * @return {RawHomeworkResult}
	 */
	public async getRawHomework(params: RawHomeworkParams): Promise<RawHomeworkResult> {
		params.action = "Homework";
		// @ts-ignore
		return await this.request(params);
	}

	/**
	 * gets the homework edulink calls current
	 * @return {HomeworkResult}
	 */
	public async getCurrentHomework(): Promise<HomeworkResult> {
		//@ts-ignore
		let rawHomework: RawHomeworkResult = await this.getRawHomework({data: {format:2}});
		return rawHomework.result.homework.current;
	}

	/**
	 * gets the homework edulink calls past
	 * @return {HomeworkResult}
	 */
	public async getPastHomework(): Promise<HomeworkResult> {
		//@ts-ignore
		let rawHomework: RawHomeworkResult = await this.getRawHomework({data: {format: 2}});
		return rawHomework.result.homework.past;
	}
}
import { fetchHeaders } from "../types/fetchHeaders.js";
/**
 * Class for interaction with the Edulink API
 */
export class Edulink {
    /**
     * Create an instance of the edulink API helper.
     * @param {string} schoolId - the part of the web address which goes before .edulinkone.com
     * @param {string} username - the username used to log in to edulink
     * @param {string} password - the password used to log in to edulink
     * @param {number} establishment_id - unknown usage but cannot log in without it
     */
    constructor(schoolId, username, password, establishment_id) {
        this.isAuthenticated = false;
        this.schoolId = schoolId;
        this.Authenticate({ data: { username, password, establishment_id } });
    }
    /**
     * Send a request to the edulink API
     * @param {Params} params - the edulink action and any data being sent in the http request body
     * @private
     */
    async request(params) {
        const response = await fetch(`https://${this.schoolId}.edulinkone.com/api/`, {
            headers: (this.isAuthenticated ? { ...fetchHeaders, "Authorization": `Bearer ${this.authToken}`, "X-API-Method": `EduLink.${params.action}` } : { ...fetchHeaders, "X-API-Method": `EduLink.${params.action}` }),
            method: "POST",
            body: JSON.stringify({
                id: "1",
                jsonrpc: "2.0",
                method: `EduLink.${params.action}`,
                params: params.data,
            }),
        }).then(res => res.json());
        if (!response.result.success) {
            throw new Error(`${params.action}: ${response.result.error ?? 'unknown'}`);
        }
        else {
            return response;
        }
    }
    /**
     * Used to log in to edulink allowing the api to be used.
     * @param {AuthParams} params - takes the schoolId, user and password
     * @constructor
     * @private
     */
    async Authenticate(params) {
        params.action = "Login";
        // @ts-ignore
        const response = await this.request(params);
        this.isAuthenticated = true;
        this.authToken = response.result.authtoken;
        this.learner_id = response.result.user.id;
    }
    /**
     * gets the raw edulink API timetable data
     * @param {RawTimetableParams} params - takes in the current date and userid/learner_id
     * @return {RawTimetableResult}
     */
    async getRawTimetable(params) {
        params.action = "Timetable";
        // @ts-ignore
        return await this.request(params);
    }
    /**
     * gets the data for the week edulink classes as the 'current week'
     * @return {Week}
     */
    async getThisWeek() {
        let rawTimetable = await this.getRawTimetable({ data: { date: (new Date).toISOString().split('T')[0], learner_id: this.learner_id } });
        return rawTimetable.result.weeks[0];
    }
    /**
     * gets the data for the day edulink classes as "today"
     * @return {Day}
     */
    async getToday() {
        //@ts-ignore
        let rawWeek = this.getThisWeek();
        for (let i = 0; i < rawWeek.days.length; i++) {
            if (rawWeek.days[i].is_current === true) {
                return rawWeek.days[i];
            }
        }
    }
    /**
     * gets the raw edulink API homework data
     * @param {RawHomeworkParams} params - not sure why, but it wants a number here
     * @return {RawHomeworkResult}
     */
    async getRawHomework(params) {
        params.action = "Homework";
        // @ts-ignore
        return await this.request(params);
    }
    /**
     * gets the homework edulink calls current
     * @return {HomeworkResult}
     */
    async getCurrentHomework() {
        //@ts-ignore
        let rawHomework = await this.getRawHomework({ data: { format: 2 } });
        return rawHomework.result.homework.current;
    }
    /**
     * gets the homework edulink calls past
     * @return {HomeworkResult}
     */
    async getPastHomework() {
        //@ts-ignore
        let rawHomework = await this.getRawHomework({ data: { format: 2 } });
        return rawHomework.result.homework.past;
    }
}
//# sourceMappingURL=edulink.js.map
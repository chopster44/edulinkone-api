import { Day, HomeworkResult, RawHomeworkResult, RawTimetableResult, Week } from "../types/result.js";
import { RawHomeworkParams, RawTimetableParams } from "../types/params.js";
/**
 * Class for interaction with the Edulink API
 */
export declare class Edulink {
    /**
     * a variable representing if the user has authenticated
     * @type {boolean}
     */
    isAuthenticated: boolean;
    /**
     * the part of the web address which goes before .edulinkone.com
     * @type {string}
     */
    readonly schoolId: string;
    /**
     * the auth token given by edulink allowing for interactions. generated on class creation
     * @type {string}
     */
    authToken: string;
    /**
     * the name used to identify the user in the edulink backend
     * @type {string}
     */
    learner_id: string;
    private authParams;
    /**
     * Create an instance of the edulink API helper.
     * @param {string} schoolId - the part of the web address which goes before .edulinkone.com
     * @param {string} username - the username used to log in to edulink
     * @param {string} password - the password used to log in to edulink
     * @param {number} establishment_id - unknown usage but cannot log in without it
     */
    constructor(schoolId: string, username: string, password: string, establishment_id: number);
    /**
     * Send a request to the edulink API
     * @param {Params} params - the edulink action and any data being sent in the http request body
     * @private
     */
    private request;
    /**
     * Used to log in to edulink allowing the api to be used.
     * @private
     */
    Authenticate(): Promise<void>;
    /**
     * gets the raw edulink API timetable data
     * @param {RawTimetableParams} params - takes in the current date and userid/learner_id
     * @return {RawTimetableResult}
     */
    getRawTimetable(params: RawTimetableParams): Promise<RawTimetableResult>;
    /**
     * gets the data for the week edulink classes as the 'current week'
     * @return {Week}
     */
    getThisWeek(): Promise<Week>;
    /**
     * gets the data for the day edulink classes as "today"
     * @return {Day}
     */
    getToday(): Promise<Day>;
    /**
     * gets the raw edulink API homework data
     * @param {RawHomeworkParams} params - not sure why, but it wants a number here
     * @return {RawHomeworkResult}
     */
    getRawHomework(params: RawHomeworkParams): Promise<RawHomeworkResult>;
    /**
     * gets the homework edulink calls current
     * @return {HomeworkResult}
     */
    getCurrentHomework(): Promise<HomeworkResult>;
    /**
     * gets the homework edulink calls past
     * @return {HomeworkResult}
     */
    getPastHomework(): Promise<HomeworkResult>;
}

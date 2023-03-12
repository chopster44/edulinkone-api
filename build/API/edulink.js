"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Edulink = void 0;
const fetchHeaders_1 = require("../types/fetchHeaders");
class Edulink {
    constructor(schoolId) {
        this.isAuthenticated = false;
        this.schoolId = schoolId;
    }
    async request(params) {
        const response = await fetch(`https://${this.schoolId}.edulinkone.com/api/`, {
            headers: (this.isAuthenticated ? { ...fetchHeaders_1.fetchHeaders, "Authorization": `Bearer ${this.authToken}`, "X-API-Method": `EduLink.${params.action}` } : { ...fetchHeaders_1.fetchHeaders, "X-API-Method": `EduLink.${params.action}` }),
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
    async Authenticate(params) {
        params.action = "Login";
        // @ts-ignore
        const response = await this.request(params);
        this.isAuthenticated = true;
        this.authToken = response.result.authtoken;
        this.learner_id = response.result.user.id;
    }
    async getRawTimetable(params) {
        params.action = "Timetable";
        // @ts-ignore
        return await this.request(params);
    }
    async getThisWeek() {
        let rawTimetable = await this.getRawTimetable({ data: { date: (new Date).toISOString().split('T')[0], learner_id: this.learner_id } });
        return rawTimetable.result.weeks[0];
    }
    async getToday() {
        //@ts-ignore
        let rawWeek = this.getThisWeek();
        for (let i = 0; i < rawWeek.days.length; i++) {
            if (rawWeek.days[i].date === (new Date).toISOString().split('T')[0]) {
                return rawWeek.days[i];
            }
        }
    }
    async getRawHomework(params) {
        params.action = "Homework";
        // @ts-ignore
        return await this.request(params);
    }
    async getCurrentHomework() {
        //@ts-ignore
        let rawHomework = await this.getRawHomework({ data: { format: 2 } });
        return rawHomework.result.homework.current;
    }
    async getPastHomework() {
        //@ts-ignore
        let rawHomework = await this.getRawHomework({ data: { format: 2 } });
        return rawHomework.result.homework.past;
    }
}
exports.Edulink = Edulink;
//# sourceMappingURL=edulink.js.map
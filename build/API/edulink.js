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
    }
    async getRawTimetable(params) {
        params.action = "Timetable";
        // @ts-ignore
        return this.request(params);
    }
    async getRawHomework(params) {
        params.action = "Homework";
        // @ts-ignore
        return this.request(params);
    }
}
exports.Edulink = Edulink;
//# sourceMappingURL=edulink.js.map
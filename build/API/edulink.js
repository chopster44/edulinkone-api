"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Edulink = void 0;
const fetchHeaders_1 = require("../types/fetchHeaders");
class Edulink {
    constructor(schoolId) {
        this.isAuthenticated = false;
        this.schoolId = schoolId;
    }
    async Authenticate(credentials) {
        console.log(credentials);
        const response = await fetch(`https://${this.schoolId}.edulinkone.com/api/`, {
            headers: { ...fetchHeaders_1.fetchHeaders, "X-API-Method": "EduLink.Login" },
            method: "POST",
            body: JSON.stringify({
                id: "1",
                jsonrpc: "2.0",
                method: "EduLink.Login",
                params: credentials,
            }),
        }).then(res => res.json());
        if (!response.result.success) {
            throw new Error(`Login: ${response.result.error ?? 'unknown'}`);
        }
        else {
            this.isAuthenticated = true;
        }
        console.log(response);
    }
    getTimetable() {
    }
    getHomework() {
    }
}
exports.Edulink = Edulink;
//# sourceMappingURL=edulink.js.map
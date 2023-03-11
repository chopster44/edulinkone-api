"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edulink_1 = require("./API/edulink");
let edulink = new edulink_1.Edulink("marlingschool");
let credentials = {
    action: "Login",
    data: {
        establishment_id: 2,
        fcm_token_old: "none",
        from_app: false,
        password: "Speedboat1!?",
        username: "20c33002@marling.school",
    }
};
let timetableParams = {
    action: "Timetable",
    data: {
        date: (new Date()).toISOString().split('T')[0],
        learner_id: "33002"
    }
};
let homeworkParams = {
    action: "Homework",
    data: {
        format: 2
    }
};
async function main() {
    await edulink.Authenticate(credentials);
    let res = await edulink.getTimetable(timetableParams);
    console.log(res);
    let res1 = await edulink.getHomework(homeworkParams);
    console.log(res1.result.homework.current);
}
main();
//# sourceMappingURL=index.js.map
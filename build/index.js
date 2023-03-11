"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edulink_1 = require("./API/edulink");
let edulink = new edulink_1.Edulink("marlingschool");
let credentials = {
    establishment_id: 2,
    username: "20c33002",
    password: "Speedboat1!?"
};
let timetableParams = {
    date: (new Date()).toISOString().split('T')[0],
    learner_id: "33002"
};
async function main() {
    await edulink.Authenticate(credentials);
    let res = await edulink.getTimetable(timetableParams);
    console.log(res);
}
main();
//# sourceMappingURL=index.js.map
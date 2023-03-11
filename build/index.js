"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edulink_1 = require("./API/edulink");
let edulink = new edulink_1.Edulink("marlingschool");
let credentials = {
    establishment_id: 2,
    username: "20c33002",
    password: "Speedboat1!?"
};
edulink.Authenticate(credentials);
//# sourceMappingURL=index.js.map
import {Edulink} from "./API/edulink";
import {LoginCredentials} from "./types/loginCredentials";
import {TimetableParams} from "./types/timetableParams";

let edulink = new Edulink("marlingschool");

let credentials: LoginCredentials = {
	establishment_id: 2,
	username: "20c33002",
	password: "Speedboat1!?"
}

let timetableParams: TimetableParams = {
	date: (new Date()).toISOString().split('T')[0],
	learner_id: "33002"
}

async function main() {
	await edulink.Authenticate(credentials);
	let res = await edulink.getTimetable(timetableParams);
	console.log(res);
	let res1 = await edulink.getHomework();
	console.log(res1.current);
}

main();
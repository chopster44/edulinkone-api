import {Edulink} from "./API/edulink";
import * as EdulinkTypes from "./types/types";

export {
	EdulinkTypes
}
export default Edulink;

let edulink = new Edulink("marlingschool");

let credentials: EdulinkTypes.ParamTypes.AuthParams = {
	action: "Login",
	data: {
		establishment_id: 2,
		fcm_token_old: "none",
		from_app: false,
		password: "Speedboat1!?",
		username: "20c33002@marling.school",
	}
}

let timetableParams: EdulinkTypes.ParamTypes.TimetableParams = {
	action: "Timetable",
	data: {
		date: (new Date()).toISOString().split('T')[0],
		learner_id: "33002"
	}
}

let homeworkParams: EdulinkTypes.ParamTypes.HomeworkParams = {
	action: "Homework",
	data: {
		format: 2
	}
}

async function main() {
	await edulink.Authenticate(credentials);
	let res: EdulinkTypes.ResultTypes.TimetableResult = await edulink.getTimetable(timetableParams);
	console.log(res);
	let res1: EdulinkTypes.ResultTypes.HomeworkResult = await edulink.getHomework(homeworkParams);
	console.log(res1.result.homework.current);
}

main();
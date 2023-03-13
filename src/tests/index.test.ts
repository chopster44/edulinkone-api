import {Edulink, EdulinkTypes} from "../index.js";
console.log(process.argv)
async function main () {
	let edulinkTest = new Edulink(process.argv[2], process.argv[3], process.argv[4], 2);
	await edulinkTest.Authenticate();
	if (!edulinkTest.isAuthenticated) {
		throw new Error("Auth Error: class has not authenticated");
	}

	let rawTimetable: EdulinkTypes.ResultTypes.RawTimetableResult = await edulinkTest.getRawTimetable({data:  {
			date: (new Date).toISOString().split("T")[0],
			learner_id: edulinkTest.learner_id
		}
	});
	if (rawTimetable == undefined) {
		throw new Error("Timetable Error: out from timetable is undefined");
	}

	let thisWeek = await edulinkTest.getThisWeek();
	if (thisWeek == undefined) {
		throw new Error("Timetable Error: out from getThisWeek() is undefined");
	}

	let today = await edulinkTest.getToday();
	if (today == undefined) {
		throw new Error("Timetable Error: out from getToday() is undefined");
	}
}

try {
	main()
} catch (error) {
	console.error(error);
}

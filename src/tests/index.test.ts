import {Edulink} from "../index.js";
async function main () {
	let edulinkTest = new Edulink("marlingschool", "20c33002", "Speedboat1!?", 2);
	if (!edulinkTest.isAuthenticated) {
		throw new Error("Auth Error: class has not authenticated");
	}
}

try {
	main()
} catch (error) {
	console.error(error);
}

import {Edulink} from "./API/edulink";
import {LoginCredentials} from "./types/loginCredentials";

let edulink = new Edulink("marlingschool");

let credentials: LoginCredentials = {
	establishment_id: 2,
	username: "20c33002",
	password: "Speedboat1!?"
}

edulink.Authenticate(credentials);
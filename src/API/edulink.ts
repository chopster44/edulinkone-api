import {fetchHeaders} from "../types/fetchHeaders";
import {LoginCredentials} from "../types/loginCredentials";

export class Edulink {
	public isAuthenticated: boolean;
	readonly schoolId: string;
	constructor(schoolId: string) {
		this.isAuthenticated = false;
		this.schoolId = schoolId;
	}

	public async Authenticate(credentials: LoginCredentials) {
		const response: any = await fetch(`https://${this.schoolId}.edulinkone.com/api/`,
			{
				headers: { ...fetchHeaders, "X-API-Method": "EduLink.Login" },
				method: "POST",
				body: JSON.stringify({
					id: "1",
					jsonrpc: "2.0",
					method: "EduLink.Login",
					params: credentials,
				}),
			}).then(res => res.json());
		if (!response.result.success) {
			throw new Error(`Login: ${response.result.error ?? 'unknown'}`)
		}
		else {
			this.isAuthenticated = true;
		}
	}

	public async getTimetable() {
	}

	public getHomework() {
	}
}
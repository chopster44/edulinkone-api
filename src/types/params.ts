export interface Params {
	action?: string;
	data: {};
}

export interface AuthParams extends Params {
	data: {
		establishment_id: number;
		fcm_token_old?: string;
		from_app?: boolean;
		password: string;
		ui_info?: {
			format: number;
			version: string;
			git_sha: string;
		};
		username: string;
	}
}

export interface RawTimetableParams extends Params {
	data: {
		date: string;
		learner_id: string;
	}
}

export interface RawHomeworkParams extends Params {
	data: {
		format: number;
	}
}

export interface HomeworkDescriptionParams {
	id: string,
	source: string
}

export interface HomeworkCompleteParams {
	id: string,
	completed: boolean,
}
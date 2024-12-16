import { getGitHubAuthToken } from "get-github-auth-token";
import { Octokit } from "octokit";

import { OctokitOptions } from "./types.js";

export async function octokitFromAuthSafe(
	options?: OctokitOptions,
): Promise<Octokit> {
	const auth = await retrieveAuthSafe(options?.auth as string | undefined);

	return new Octokit({ ...options, auth });
}

async function retrieveAuthSafe(provided: string | undefined) {
	if (provided) {
		return provided;
	}

	if (provided === "") {
		return undefined;
	}

	const auth = await getGitHubAuthToken();
	if (auth.succeeded) {
		return auth.token;
	}

	return undefined;
}

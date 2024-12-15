import { getGitHubAuthToken } from "get-github-auth-token";
import { Octokit } from "octokit";

export type OctokitOptions = ConstructorParameters<typeof Octokit>[0] & {
	auth?: string;
};

export async function octokitFromAuth(
	options?: OctokitOptions,
): Promise<Octokit> {
	const auth = await retrieveAuth(options?.auth as string | undefined);

	return new Octokit({ ...options, auth });
}

async function retrieveAuth(provided: string | undefined) {
	if (provided) {
		return provided;
	}

	if (provided === "") {
		throw new Error("Invalid auth provided: an empty string ('').");
	}

	const auth = await getGitHubAuthToken();
	if (auth.succeeded) {
		return auth.token;
	}

	throw new Error(
		"Please provide an auth token (process.env.GH_TOKEN) or log in with the GitHub CLI (gh).",
		{
			cause: auth.error,
		},
	);
}

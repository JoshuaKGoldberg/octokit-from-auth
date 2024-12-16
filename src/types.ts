import { Octokit } from "octokit";

export type OctokitOptions = ConstructorParameters<typeof Octokit>[0] & {
	auth?: string;
};

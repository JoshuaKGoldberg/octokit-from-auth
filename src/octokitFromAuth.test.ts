import { describe, expect, it, vi } from "vitest";

import { octokitFromAuth } from "./octokitFromAuth.js";
import { OctokitOptions } from "./types.js";

const mockGetGitHubAuthToken = vi.fn();

vi.mock("get-github-auth-token", () => ({
	get getGitHubAuthToken() {
		return mockGetGitHubAuthToken;
	},
}));

class MockOctokit {
	constructor(public readonly options: OctokitOptions) {}
}

vi.mock("octokit", () => ({
	get Octokit() {
		return MockOctokit;
	},
}));

const auth = "gho_abc123";
const baseUrl = "https://example.com";

describe("octokitFromAuth", () => {
	it("throws an error when no options are provided and auth is not available", async () => {
		mockGetGitHubAuthToken.mockResolvedValueOnce({
			succeeded: false,
			token: auth,
		});

		await expect(
			async () => await octokitFromAuth(),
		).rejects.toMatchInlineSnapshot(
			`[Error: Please provide an auth token (process.env.GH_TOKEN) or log in with the GitHub CLI (gh).]`,
		);
	});

	it("throws an error when empty options are provided and auth is not available", async () => {
		mockGetGitHubAuthToken.mockResolvedValueOnce({
			succeeded: false,
			token: auth,
		});

		await expect(
			async () => await octokitFromAuth({}),
		).rejects.toMatchInlineSnapshot(
			`[Error: Please provide an auth token (process.env.GH_TOKEN) or log in with the GitHub CLI (gh).]`,
		);
	});

	it("throws an error when an empty auth is provided", async () => {
		await expect(
			async () => await octokitFromAuth({ auth: "" }),
		).rejects.toMatchInlineSnapshot(
			`[Error: Invalid auth provided: an empty string ('').]`,
		);
		expect(mockGetGitHubAuthToken).not.toHaveBeenCalled();
	});

	it("resolves with an octokit when an auth is provided", async () => {
		const actual = await octokitFromAuth({ auth, baseUrl });

		expect(actual).toEqual(new MockOctokit({ auth, baseUrl }));
		expect(mockGetGitHubAuthToken).not.toHaveBeenCalled();
	});

	it("resolves with an octokit with no options when no options are provided and auth is available", async () => {
		mockGetGitHubAuthToken.mockResolvedValueOnce({
			succeeded: true,
			token: auth,
		});

		const actual = await octokitFromAuth();

		expect(actual).toEqual(new MockOctokit({ auth }));
	});

	it("resolves with an octokit with options when options are provided without auth and auth is available", async () => {
		mockGetGitHubAuthToken.mockResolvedValueOnce({
			succeeded: true,
			token: auth,
		});

		const actual = await octokitFromAuth({ baseUrl });

		expect(actual).toEqual(new MockOctokit({ auth, baseUrl }));
	});
});

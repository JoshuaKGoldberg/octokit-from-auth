import { describe, expect, it, vi } from "vitest";

import { octokitFromAuthSafe } from "./octokitFromAuthSafe.js";
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

describe("octokitFromAuthSafe", () => {
	it("creates an Octokit without auth when no options are provided and auth is not available", async () => {
		mockGetGitHubAuthToken.mockResolvedValueOnce({
			succeeded: false,
			token: auth,
		});

		const actual = await octokitFromAuthSafe();

		expect(actual).toEqual(new MockOctokit({}));
	});

	it("creates an Octokit without auth when empty options are provided and auth is not available", async () => {
		mockGetGitHubAuthToken.mockResolvedValueOnce({
			succeeded: false,
			token: auth,
		});

		const actual = await octokitFromAuthSafe({});

		expect(actual).toEqual(new MockOctokit({}));
	});

	it("creates an Octokit without auth when an empty auth is provided", async () => {
		const actual = await octokitFromAuthSafe({ auth: "" });

		expect(actual).toEqual(new MockOctokit({}));
		expect(mockGetGitHubAuthToken).not.toHaveBeenCalled();
	});

	it("resolves with an octokit when an auth is provided", async () => {
		const actual = await octokitFromAuthSafe({ auth, baseUrl });

		expect(actual).toEqual(new MockOctokit({ auth, baseUrl }));
		expect(mockGetGitHubAuthToken).not.toHaveBeenCalled();
	});

	it("resolves with an octokit with no options when no options are provided and auth is available", async () => {
		mockGetGitHubAuthToken.mockResolvedValueOnce({
			succeeded: true,
			token: auth,
		});

		const actual = await octokitFromAuthSafe();

		expect(actual).toEqual(new MockOctokit({ auth }));
	});

	it("resolves with an octokit with options when options are provided without auth and auth is available", async () => {
		mockGetGitHubAuthToken.mockResolvedValueOnce({
			succeeded: true,
			token: auth,
		});

		const actual = await octokitFromAuthSafe({ baseUrl });

		expect(actual).toEqual(new MockOctokit({ auth, baseUrl }));
	});
});

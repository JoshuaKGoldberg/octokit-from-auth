<h1 align="center">Octokit From Auth</h1>

<p align="center">
	Creates a GitHub Octokit instance from any available auth token.
	🐙
</p>

<p align="center">
	<!-- prettier-ignore-start -->
	<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
	<a href="#contributors" target="_blank"><img alt="👪 All Contributors: 1" src="https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-1-21bb42.svg" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
	<!-- prettier-ignore-end -->
	<a href="https://github.com/JoshuaKGoldberg/octokit-from-auth/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
	<a href="https://codecov.io/gh/JoshuaKGoldberg/octokit-from-auth" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/JoshuaKGoldberg/octokit-from-auth?label=%F0%9F%A7%AA%20coverage" /></a>
	<a href="https://github.com/JoshuaKGoldberg/octokit-from-auth/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg" /></a>
	<a href="http://npmjs.com/package/octokit-from-auth" target="_blank"><img alt="📦 npm version" src="https://img.shields.io/npm/v/octokit-from-auth?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
	<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
</p>

## Usage

```shell
npm i octokit-from-auth
```

Two functions are exported by the `octokit-from-auth` package.
Both are asynchronous and take in the same constructor parameters as the [`Octokit` class](https://github.com/octokit/octokit.js?tab=readme-ov-file#octokit-api-client):

- `octokitFromAuth`: rejects if an auth token isn't provided and can't be resolved by [`get-github-auth-token`](https://github.com/JoshuaKGoldberg/get-github-auth-token)
- `octokitFromAuthSafe`: resolves an `Octokit` with no authentication if an auth token isn't provided and can't be resolved by [`get-github-auth-token`](https://github.com/JoshuaKGoldberg/get-github-auth-token)

Both return a new Octokit instance.

```ts
import { octokitFromAuth } from "octokit-from-auth";

// auth token used:
// process.env.GH_TOKEN ?? (await $`gh auth token`)
await octokitFromAuth();
```

The Octokit's `auth` is retrieved with [`get-github-auth-token`](https://github.com/JoshuaKGoldberg/get-github-auth-token), which defaults to `process.env.GH_TOKEN`, or failing that, [`gh auth token`](https://cli.github.com/manual/gh_auth_token).
If neither is available then an auth token must be provided as an option:

```ts
import { octokitFromAuth } from "octokit-from-auth";

// auth token used:
// "gho_..."
await octokitFromAuth({ auth: "gho_..." });
```

## Development

See [`.github/CONTRIBUTING.md`](./.github/CONTRIBUTING.md), then [`.github/DEVELOPMENT.md`](./.github/DEVELOPMENT.md).
Thanks! 🐙

## Contributors

<!-- spellchecker: disable -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://www.joshuakgoldberg.com/"><img src="https://avatars.githubusercontent.com/u/3335181?v=4?s=100" width="100px;" alt="Josh Goldberg ✨"/><br /><sub><b>Josh Goldberg ✨</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/octokit-from-auth/commits?author=JoshuaKGoldberg" title="Code">💻</a> <a href="#content-JoshuaKGoldberg" title="Content">🖋</a> <a href="https://github.com/JoshuaKGoldberg/octokit-from-auth/commits?author=JoshuaKGoldberg" title="Documentation">📖</a> <a href="#ideas-JoshuaKGoldberg" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-JoshuaKGoldberg" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-JoshuaKGoldberg" title="Maintenance">🚧</a> <a href="#projectManagement-JoshuaKGoldberg" title="Project Management">📆</a> <a href="#tool-JoshuaKGoldberg" title="Tools">🔧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- spellchecker: enable -->

> 💝 This package was templated with [`create-typescript-app`](https://github.com/JoshuaKGoldberg/create-typescript-app) using the [Bingo engine](https://create.bingo).

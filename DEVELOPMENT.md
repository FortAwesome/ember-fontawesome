# Developing Ember Fontawesome

## Tasks

The following commands are available through `npm run`

Command  | Purpose
-------- | -----------------------------------------------------------------
build    | Build this project
lint     | Check linting using ESLint
start    | Starts the addon and the test app
test     | Test all supported versions

## Releasing a new version
<a name="release"></a>

**See authenticating with the npm.fontawesome.com registry before doing the following**

1. Check if all CI tests on github 3.x branch were passed
1. Open `package.json` from `ember-fontawesome` folder and update the version number
1. Add new contributors to the `contributors` section
1. Update the `CHANGELOG.md`
1. `pnpm install`, run `pnpm build` and `pnpm lint`
1. `git add . && git commit -m 'Release VERSION'`
1. `git push`
1. `cd ember-fontawesome`
1. `pnpm publish --tag latest --tag latest-3`
1. `pnpm publish --tag latest --tag latest-3 --registry https://npm.fontawesome.com` (publish to Pro registry)
1. Create a [new release](https://github.com/FortAwesome/ember-fontawesome/releases/new) with `CHANGELOG` details

## Authenticating with the npm.fontawesome.com registry

Contributors with authorization to publish to npm.fontawesome.com will receive an invite
from a Font Awesome project owner.

1. Respond to the invite in your email
1. Let the owner know when you've setup your account
1. Owner will add you to the team

You can then run:

```
npm login --registry https://npm.fontawesome.com
```

- The username is the "slug" for your Cloudsmith account. For example mine is "rob-madole".
- Enter the password that you setup just a few minutes ago.
- It says the your email is PUBLIC. Pretty sure that's false since the auth is through Cloudsmith.
- This doesn't overwrite your standard login, just adds to your `~/.npmrc`

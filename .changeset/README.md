# Changesets

This project uses [changesets](https://github.com/changesets/changesets) to manage versions and changelogs.

## Adding a changeset

When you make a change that should be released, run:

```bash
npx changeset
```

This will prompt you to select the package and the type of change (patch/minor/major).

## Releasing

When ready to release, run:

```bash
npx changeset version   # bumps versions and updates CHANGELOG.md
npm run build            # rebuild the package
git push --follow-tags   # push the version tag to trigger publish
```

The `publish.yml` workflow automatically publishes to GitHub Packages when a `v*` tag is pushed.

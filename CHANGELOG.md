<!--
 @since 2025.05.02
 @changed 2025.05.23, 23:27
-->

# CHANGELOG

## [v.0.0.10](https://github.com/lilliputten/team-tree-app/releases/tag/v.0.0.10) - 2025.05.23

- Added telegram authorization.

See also:

- [Issue #37: Add telegram authentication](https://github.com/lilliputten/team-tree-app/issues/37)
- [Compare with the previous version](https://github.com/lilliputten/team-tree-app/compare/v.0.0.9...v.0.0.10)

## [v.0.0.9](https://github.com/lilliputten/team-tree-app/releases/tag/v.0.0.9) - 2025.05.07

- Refactored sign-in modal, extracted sign-in form component (`SignInForm`).
- Adjusted welcome page layout added info and sign-in blocks.
- Added content blocks for welcome and info pages, added visual arts, added rich content sections.
- Fixed misc minor issues: Using localized links. Fixed adaptive layouts: fixed a bug with a middle centering on small screens. All debug class in a form of `__*` became conditional (only with `isDev`). Removed wrong colors from svg arts. Moved all used svgs to `src/assets/arts`. Updated opengraph image.

See also:

- [Issue #32: Create welcome/info pages](https://github.com/lilliputten/team-tree-app/issues/32)
- [Issue #35: Fix misc issues](https://github.com/lilliputten/team-tree-app/issues/35)
- [Compare with the previous version](https://github.com/lilliputten/team-tree-app/compare/v.0.0.8...v.0.0.9)

## [v.0.0.8](https://github.com/lilliputten/team-tree-app/releases/tag/v.0.0.8) - 2025.05.07

- Implemented adding records with current user id.
- Added `deleteUser` action. Updated prisma schema to remove user' records as cascaded. Updated user and record typings. Updated `fetchRecord*` actions to allow specify owner users. Updated tests.

See also:

- [Issue #31: Create/edit records for the current user](https://github.com/lilliputten/team-tree-app/issues/31)
- [Compare with the previous version](https://github.com/lilliputten/team-tree-app/compare/v.0.0.7...v.0.0.8)

## [v.0.0.7](https://github.com/lilliputten/team-tree-app/releases/tag/v.0.0.7) - 2025.05.02

2025.05.07, 16:11

- Adding authorization, updated prisma scheme.
- Improved modal window providers logic, added extra auth-related logging, changed `signIn` invocation method.
- Added user account navbar menu.
- Created public (welcome) and restricted (data) pages. Navigation menu links are conditional now: some of them are displaying only if user has been authorized (if `userRequiredOnly` property and `USER_REQUIRED` have been set).
- Updated navbar navigation, added some navigation helpers, added missed localizations, fixed broken tests, renamed `documentation` route to `info`.

See also:

- [Issue #29: Add oauth authorization](https://github.com/lilliputten/team-tree-app/issues/29)
- [Compare with the previous version](https://github.com/lilliputten/team-tree-app/compare/v.0.0.6...v.0.0.7)

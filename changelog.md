# Changelog

All changes to the project will be documented here.

## [v2.0.0] - 2026-11-04

### Breaking

-   `CardEditor`, `CardDefinition` and `hexToRgb` are no longer exported, use `createCard` instead.
-   Only the package root can be imported (`exports` field), no more deep imports into `dist/`.

### Added

-   `createCard(input)`, which returns the card as a PNG `Buffer`.
-   Exported `cardInputSchema` and the `CardInput`, `AttackType`, `CardType` and `ColorFilterMatch` types.
-   Runtime validation of the library input: cost `0-9`, max 5 attacks, valid card type and range.
-   `lor-card --version` now reads the version from `package.json`.

### Changed

-   `createCard` only returns the image: unlike `CardEditor`'s `save()`, it doesn't write `output.png` or print messages, so saving the card is up to you.
-   Errors keep their stack trace, and the original error is available as `cause`.
-   The CLI shows every validation issue in its table and exits with code `1` on failure.

### Fixed

-   CLI errors no longer crash with an unhandled promise rejection.

## [v1.1.0] - 2024-11-16

### Added

-   Exporting `*.d.ts` files.
-   Using `Zod` for input parsing at runtime.
-   Requiring `image` to be passed in.
-   Exporting `CardEditor` to be used in other projects.

## [v1.0.0] - 2024-11-09

-   Initial CLI release.

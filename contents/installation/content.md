# Installation

## System requirements

- macOS 13 Ventura or later
- Apple Silicon or Intel Mac

## Install via DMG

This is the recommended method for most users.

1. Download `Micronote.dmg` from [GitHub Releases](https://github.com/micronote-dev/micronote/releases).
2. Open the DMG and drag `Micronote.app` to `/Applications`.
3. Launch Micronote.

## Build from source

For developers who want to build from the repository.

```bash
git clone https://github.com/micronote-dev/micronote
cd micronote
pnpm install
pnpm build
```

The built app will be in `build/darwin/`.

## Updating

Download the latest DMG from GitHub Releases and replace the existing app in `/Applications`. Micronote does not include an auto-updater.

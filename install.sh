#!/usr/bin/env bash

# NERDS Universal CLI Installer
# Downloads the initializer and executes with forwarded CLI flags.

set -e

TMP_DIR=$(mktemp -d)
TMP_SCRIPT="$TMP_DIR/nerds-init.js"

trap 'rm -rf "$TMP_DIR"' EXIT

# Fetch latest bin/nerds-init.js if running remotely
if [ -f "./bin/nerds-init.js" ]; then
  node "./bin/nerds-init.js" "$@"
else
  curl -fsSL "https://raw.githubusercontent.com/shlok377/nerds/main/bin/nerds-init.js" -o "$TMP_SCRIPT"
  node "$TMP_SCRIPT" "$@"
fi

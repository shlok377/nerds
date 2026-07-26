#!/usr/bin/env bash

# NERDS Universal Interactive Installer
# Downloads the TUI wizard and attaches terminal TTY for arrow-key interactive navigation.

set -e

TMP_DIR=$(mktemp -d /tmp/nerds-installer-XXXXXX)
TMP_SCRIPT="$TMP_DIR/nerds-init.js"

trap 'rm -rf "$TMP_DIR"' EXIT

# Fetch latest bin/nerds-init.js
curl -fsSL "https://raw.githubusercontent.com/shlok377/nerds/main/bin/nerds-init.js" -o "$TMP_SCRIPT"

# Execute with explicit /dev/tty stdin redirection for interactive TUI
node "$TMP_SCRIPT" < /dev/tty

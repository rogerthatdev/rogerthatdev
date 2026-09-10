#!/usr/bin/env bash
#
# new-post.sh — scaffold a new blog post branch and file.
#
# Usage:
#   ./scripts/new-post.sh <branch-name> <file-name> <slug>
#
# Example:
#   ./scripts/new-post.sh terraform-state-split terraform-state-split \
#     "splitting-terraform-state-across-environments"
#
# Assumes it is run from anywhere inside the repo.

set -euo pipefail

CONTENT_DIR="${CONTENT_DIR:-content/posts}"
BASE_BRANCH="${BASE_BRANCH:-main}"

die() {
  printf 'error: %s\n' "$1" >&2
  exit 1
}

if [ "$#" -ne 3 ]; then
  cat >&2 <<'USAGE'
usage: new-post.sh <branch-name> <file-name> <slug>

  branch-name   name of the git branch to create (prefixed with post/)
  file-name     markdown file name, without the .md extension
  slug          url slug written into the front matter
USAGE
  exit 1
fi

BRANCH_NAME="$1"
FILE_NAME="$2"
SLUG="$3"

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null)" \
  || die "not inside a git repository"
cd "$REPO_ROOT"

CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [ "$CURRENT_BRANCH" != "$BASE_BRANCH" ]; then
  die "on '$CURRENT_BRANCH', expected '$BASE_BRANCH'. Switch branches and retry."
fi

if [ -n "$(git status --porcelain)" ]; then
  die "working tree is dirty. Commit or stash your changes first."
fi

BRANCH="post/${BRANCH_NAME}"
if git show-ref --verify --quiet "refs/heads/${BRANCH}"; then
  die "branch '${BRANCH}' already exists."
fi

POST_PATH="${CONTENT_DIR}/${FILE_NAME}.md"
if [ -e "$POST_PATH" ]; then
  die "file '${POST_PATH}' already exists."
fi

printf 'Pulling latest %s...\n' "$BASE_BRANCH"
git pull --ff-only origin "$BASE_BRANCH"

printf 'Creating branch %s...\n' "$BRANCH"
git checkout -b "$BRANCH"

mkdir -p "$CONTENT_DIR"

TODAY="$(date +%Y-%m-%d)"
TITLE="$(printf '%s' "$FILE_NAME" | tr '-' ' ')"

cat > "$POST_PATH" <<EOF
---
title: "${TITLE}"
slug: "${SLUG}"
date: "${TODAY}"
draft: true
description: ""
tags: []
---

## Introduction

<!-- What question does this post answer, and for whom? -->

## Body

## Conclusion
EOF

git add "$POST_PATH"

printf '\nCreated %s on branch %s\n' "$POST_PATH" "$BRANCH"

if [ -n "${EDITOR:-}" ]; then
  "$EDITOR" "$POST_PATH"
fi
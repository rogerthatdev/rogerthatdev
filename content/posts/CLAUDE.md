# Writing assistant instructions — content/posts/

This is a Hugo blog. Files here are published posts, not application code. When
working in this directory, act as a writing assistant/editor, not a software
engineer: prioritize clarity, voice, and accuracy over code-style conventions.

## Voice and tone

- First person, conversational but technical. The author is a developer
  relations engineer for Firebse — posts often explain cloud/AI concepts,
  walk through tutorials, or share opinions on tooling.
- Other topics include the field of developer relations and strategies for working with ADHD.
- Preserve the author's own phrasing. When editing, prefer targeted
  suggestions over wholesale rewrites — this is their writing, not generated
  content. Flag issues (unclear sentences, weak transitions, factual gaps)
  rather than silently rewriting large sections.

## Front matter

Posts use Hugo TOML front matter (`+++`, not YAML `---`):

```toml
+++
date = '2026-07-02T13:06:24-07:00'
draft = false
title = 'Post Title'
tags = ["ai", "Google Cloud"]
nowplaying = "Artist - Album"
comments = true
+++
```

- `date` and `title` are required; match the existing `YYYY-MM-DDTHH:MM:SS-07:00`
  style timestamp format.
- `draft`: `true` while a post is in progress, `false` when ready to publish.
  Never flip `draft` to `false` unless explicitly asked to.
- `tags`, `nowplaying`, `comments` are optional — only add them if the author
  is using them for that post (don't invent tags on their behalf; ask if
  unsure).
- Note: `.agents/skills/new-post/scripts/new-post.sh` currently scaffolds YAML
  front matter (`slug`, `description`) that doesn't match this TOML format
  used by every real post. Follow the TOML convention above regardless of
  what the scaffold script produces, and flag the mismatch if asked to touch
  that script.

## Structure

- Body typically opens directly with prose or a `##`/`###` heading — no
  need to repeat the title as an H1.
- Markdown links for references; bold for key terms on first use.
- Hugo shortcodes appear inline, e.g. `{{< youtube VIDEO_ID >}}` — leave these
  untouched unless asked to change embedded media.

## What to avoid

- Don't add code-review-style comments, TODOs, or boilerplate disclaimers to
  post content.
- Don't change `draft`, `date`, or `title` without being asked.
- Don't "fix" intentional informality (contractions, sentence fragments used
  for effect, first-person asides).
- If a post references external tools/products, don't add unrequested
  caveats or hedging — match the author's confident, direct style.

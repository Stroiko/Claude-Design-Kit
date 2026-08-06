# How Claude Design consumes a connected GitHub repo — grounding research

Researched: 2026-08-06. Primary sources: anthropic.com newsroom, support.claude.com help center, claude.com docs, code.claude.com docs. Third-party press is used only for corroboration and is labeled as such.

**Bottom line up front:** Claude Design is real and officially documented, and GitHub repos are officially documented as a *design-system source* and a *per-project context attachment*. But Anthropic publishes **no mechanics** for how a connected repo is read (no file-selection order, no README-first rule, no retrieval spec, no size limits, no CLAUDE.md/AGENTS.md convention for the Design surface). Everything below is split into VERIFIED facts (with the surface they belong to) and INFERENCES.

---

## 1. What Claude Design is, and where GitHub connection appears

### VERIFIED — Claude Design surface

- Claude Design is "a new Anthropic Labs product that lets you collaborate with Claude to create polished visual work like designs, prototypes, slides, one-pagers, and more," powered by Claude Opus 4.7, with a chat interface on the left and a canvas on the right. Available to Pro, Max, Team, and Enterprise subscribers (off by default on Enterprise; admin must enable). Web and desktop only.
  Source: https://www.anthropic.com/news/claude-design-anthropic-labs
  Source: https://support.claude.com/en/articles/14604416-get-started-with-claude-design
- First appears in the claude.ai release notes on **April 17, 2026** as "Claude Design, a new Anthropic Labs product."
  Source: https://support.claude.com/en/articles/12138966-release-notes
- GitHub repos appear in **two distinct roles**:
  1. **Design-system source (org-level, compile-time).** "If your design system lives in code (for example, a React component library), you can link or upload the repository, and Claude will read the components and styles." From this, Claude *generates* a design system — "Color palette… typography, components, and layout patterns" extracted from your materials — which is then published to the org and auto-attached to every new project.
     Source: https://support.claude.com/en/articles/14604397-set-up-your-design-system-in-claude-design
  2. **Per-project context attachment (chat-time).** "Link a code repository so Claude understands your existing components, architecture, and styling patterns" to make "prototypes more production-ready from the start." You can "attach systems from GitHub repos, design files, or use the `/design-sync` command in Claude Code to import from your local codebase."
     Source: https://support.claude.com/en/articles/14604416-get-started-with-claude-design
- The `/design-sync` command in **Claude Code** (v2.1.181+ per press coverage) imports a design system from your local codebase into Claude Design and can push implemented code back to the canvas. The support docs confirm the command; version numbers and the June 17, 2026 date come from third-party press (VentureBeat, TechRepublic) — treat those details as corroborated but not primary.
  Source (official): https://support.claude.com/en/articles/14604416-get-started-with-claude-design
  Source (press, corroboration only): https://venturebeat.com/technology/anthropic-ships-major-claude-design-overhaul-with-design-system-imports-code-round-trips-and-a-fix-for-its-token-burning-problem
- The exact UI label "Connect GitHub" is **not documented** in any support article I found; docs say "link or upload the repository" / "attach systems from GitHub repos." The admin guide (https://support.claude.com/en/articles/14604406-claude-design-admin-guide-for-team-and-enterprise-plans) contains no GitHub mechanics at all.

### Key official pages

| Page | URL |
|---|---|
| Announcement | https://www.anthropic.com/news/claude-design-anthropic-labs |
| Get started with Claude Design | https://support.claude.com/en/articles/14604416-get-started-with-claude-design |
| Set up your design system | https://support.claude.com/en/articles/14604397-set-up-your-design-system-in-claude-design |
| Admin guide (Team/Enterprise) | https://support.claude.com/en/articles/14604406-claude-design-admin-guide-for-team-and-enterprise-plans |
| claude.ai GitHub integration | https://support.claude.com/en/articles/10167454-use-the-github-integration and https://claude.com/docs/connectors/github |

---

## 2. What Claude reads from a connected repo, and when

### VERIFIED — Claude Design surface (thin)

- Design-system build: Claude "will read the components and styles" and produce an extracted design-system artifact (palette, typography, components, layout patterns). This is a **one-time extraction step**, updatable later via a "Remix" button that opens a chat interface over the extracted system. Docs recommend including "real examples, not just specs."
  Source: https://support.claude.com/en/articles/14604397-set-up-your-design-system-in-claude-design
- The only size guidance anywhere in the Design docs: "**Large codebases: Consider linking very large repositories from Claude Code to avoid lag or browser issues.**" No file-count, byte, or token limits are published for Claude Design.
  Source: https://support.claude.com/en/articles/14604416-get-started-with-claude-design
- **Documentation gap (stated plainly):** Anthropic does not document whether Claude Design reads the whole repo, README first, on demand, or via retrieval. Nothing on file ordering, ignore rules, or branch selection for the Design surface.

### VERIFIED — closest surface: claude.ai GitHub integration (chats + Projects)

This is the same claude.ai app family and almost certainly the shared plumbing, but these facts are documented for chats/Projects, **not** for Claude Design:

- Connecting: chats use "+" → "Add from GitHub"; Projects use "+" in project knowledge → "GitHub" → search or paste a repo URL. In both, **you pick files/folders in a file browser** — Claude does not automatically ingest the whole repo; a "Configure files" icon changes the selection later.
- What is synced: "**Only files (names and contents) in a repo on a specific branch are synced. We do not retrieve commit history, PRs, or other metadata.**"
- When: in chats, content is processed when you send your message; in Projects it is added to project knowledge. Updates are **manual** — "Sync now" fetches latest changes for previously selected files/folders.
- Limits: "The repositories must fit within Claude's context window"; docs advise being "strategic about your selections" to "keep within token limits."
  Source: https://support.claude.com/en/articles/10167454-use-the-github-integration
  Source: https://claude.com/docs/connectors/github
- Retrieval fallback (Projects surface): "**When your project knowledge approaches context limits, Claude seamlessly enables RAG mode to expand capacity by up to 10x while maintaining response quality**" (paid plans). So: small knowledge = everything in context verbatim; large knowledge = chunk retrieval, where only retrieved chunks reach the model.
  Source: https://support.claude.com/en/articles/9517075-what-are-projects

---

## 3. Does it honor README / CLAUDE.md / AGENTS.md instructions?

### VERIFIED

- **No documented convention for Claude Design or the claude.ai GitHub integration.** No support or docs page says Claude Design reads README first, or treats CLAUDE.md/AGENTS.md/.claude/ specially on the web surface. This is a genuine gap, not an oversight in my search — I checked the Design articles, the GitHub-integration articles, the admin guide, and release notes.
- **Claude Code surface** (relevant because `/design-sync` runs there): "Claude Code reads `CLAUDE.md`, not `AGENTS.md`." CLAUDE.md at repo root (or `./.claude/CLAUDE.md`) is loaded **in full at session launch**; subdirectory CLAUDE.md files load **on demand when Claude reads files in those directories**; `.claude/rules/*.md` supports `paths:` frontmatter for path-scoped loading; `@path` import syntax pulls in other files (e.g. `@AGENTS.md`). Instructions are "context, not enforced configuration."
  Source: https://code.claude.com/docs/en/memory

### INFERENCE

- Because repo files are ingested as plain "names and contents" context (per the GitHub-integration doc), any instructions inside a README **are visible to the model as ordinary text** whenever that file is in context or retrieved. Claude generally follows clearly-addressed instructions in context, but nothing guarantees the README is loaded first — or loaded at all if the user's file selection or RAG retrieval skips it.

---

## 4. Official guidance on structuring repos for Claude Design

### VERIFIED (all of it — there isn't much)

- "Import a complete design system that includes your styles, fonts, and components." Reference component names explicitly in prompts.
- Provide "real examples, not just specs"; iterate/Remix if extraction misses the brand.
- Link very large repos from Claude Code instead of the browser.
  Sources: https://support.claude.com/en/articles/14604416-get-started-with-claude-design, https://support.claude.com/en/articles/14604397-set-up-your-design-system-in-claude-design
- **No official example repo, no schema, no "how to lay out a component library for Claude Design" doc exists** as of 2026-08-06.

---

## 5. Practical implications for the "router README" (INFERENCES, grounded in the facts above)

Design constraints implied by the mechanics:

- **You cannot technically gate which files load.** On the claude.ai surface the *user* picks files/folders in a file browser, and design-system extraction is a bulk read. A router README can only *instruct the model*, not control ingestion. On the Claude Code path (`/design-sync`), CLAUDE.md genuinely controls what loads at launch and subdirectory CLAUDE.md files load lazily — that's the one surface with a real lazy-loading mechanism.
- **Assume two reading modes:** (a) everything-in-context for small selections, (b) RAG chunk retrieval for large ones. Optimize for both: instructions must survive being chunked, and directory/file names must work as retrieval anchors.

Concrete recommendations:

1. **Put the router in `README.md` at repo root, and mirror it in `CLAUDE.md` (with `CLAUDE.md` importing or duplicating the same text).** README.md is the highest-probability file to be included in any selection or extraction; CLAUDE.md is *guaranteed* to auto-load on the Claude Code `/design-sync` path. Optionally symlink/duplicate to `AGENTS.md` for other agents — Claude Code itself ignores AGENTS.md unless imported.
2. **Make the instruction the first thing in the file, addressed imperatively to the assistant**, e.g. a top-of-README block: "AI assistant instructions — read before designing: 1) Ask the user which industry this design is for before generating anything. 2) Then read ONLY the directory listed for that industry below." Short, numbered, unconditional. Repeat the "ask the industry question first" line once near the bottom too, so at least one copy survives RAG chunking.
3. **Ship a directory manifest (router table)** mapping industries → directories with one-line descriptions (`components/healthcare/ — HIPAA-styled dashboard components...`). This serves both modes: in-context, it tells the model where to look; in RAG mode, distinctive industry keywords in paths and per-directory READMEs make the right chunks retrievable.
4. **Give every industry directory its own `README.md` + `CLAUDE.md`** restating scope ("Only use these components for X; do not mix with sibling directories"). Subdirectory CLAUDE.md files load on demand in Claude Code — exactly the "load only a subset" behavior you want — and per-directory READMEs act as retrieval targets on the web surface.
5. **Keep the repo small enough to fit in context, or design for chunking.** Since "repositories must fit within Claude's context window" for full ingestion, keep the router README under ~200 lines, keep component files small and self-contained (one component per file with its tokens/comments inline), and avoid giant barrel files — a retrieved chunk should be a usable component on its own.
6. **Don't rely on the README to shape the *extracted design system*'s behavior.** Design-system extraction produces a summary artifact (palette/typography/components/patterns); behavioral rules like "ask the industry first" may not survive extraction. For org design systems, use the Remix chat to bake usage rules into the design system itself; for the ask-a-question behavior, the per-project attached repo (where the README text is literally in context) is the more reliable channel.
7. **Expect best-effort compliance, not enforcement.** Even on Claude Code, memory files are "context, not enforced configuration." Test the router empirically: attach the repo in Claude Design, prompt with a generic "design me a landing page," and verify the industry question fires; iterate on wording (specific, verifiable instructions per the memory-doc guidance) if it doesn't.

---

## Documentation gaps (explicit)

- No official doc on Claude Design's repo-reading mechanics (order, retrieval, limits, ignore rules).
- No official statement that Claude Design honors README/CLAUDE.md/AGENTS.md.
- No official repo-structure guidance for Design grounding beyond "complete design system, real examples."
- The "Connect GitHub" UI label itself is unverified in primary docs (docs say "link a code repository" / "attach systems from GitHub repos").

# Registry and directory submissions

Status (2026-11-19):
- npm `@signoff-studio/mcp@26.8.41`: published (CI tag `mcp-v26.8.41`). The `0.0.0-stage` placeholder from the first publish was unpublished on 2026-11-19; `npm view @signoff-studio/mcp versions` shows only `26.8.41` (`latest`). Unpublish and deprecate need account 2FA (authenticator or passkey); the emailed login code is not accepted.
- Official MCP Registry `io.github.samuccaya/signoff-studio@26.8.41`: published, active.
- GitHub release v26.8.41 with the .mcpb; Claude Code plugin marketplace = this repo.
- Cursor directory: live at https://cursor.directory/plugins/signoff-studio-mcp (found via the root `.mcp.json`; installs `npx -y @signoff-studio/mcp`).
- awesome-mcp-servers: PR https://github.com/punkpeye/awesome-mcp-servers/pull/19978
- mcp.so: issue https://github.com/chatmcp/mcpso/issues/7609
- Smithery: skipped. smithery.ai now leads to Arcade's "Create MCP gateway" onboarding, which builds a private gateway from Arcade's own toolkits for remote tools. It is not a public directory and does not fit a local stdio server.
- Expected to pick up the registry/GitHub by themselves (check around 2026-11-21/22): GitHub MCP Registry, PulseMCP, Glama.
- Open: Claude Desktop extensions directory (section 5).
Order matters: npm first (registries only hold metadata), then the official registry, then directories that read from it.

## Shared copy

- **Name:** SignOff Studio
- **Short (≤ 100 chars):** Local API and database verification for AI coding agents: HTTP checks and read-only SQL.
- **One paragraph:** SignOff Studio's MCP server lets AI coding agents prove a change works on the developer's machine. Agents call local APIs with inline assertions, check database rows read-only on PostgreSQL, MySQL, SQL Server, Oracle and SQLite, verify an API call and its database effect in one step, and save those checks into the repo so the next session reruns them. Runs locally over stdio; secrets are redacted by value; SQL writes need the owner's opt-in and are never allowed on production connections.
- **Install:** `npx -y @signoff-studio/mcp init`
- **Category:** Developer tools / Testing / Databases
- **Tags:** api-testing, database, sql, postgres, mysql, sqlite, sql-server, oracle, verification, testing, local
- **Links:** repo https://github.com/samuccaya/signoff-studio-mcp · docs https://testapilocally.com/mcp · npm https://www.npmjs.com/package/@signoff-studio/mcp
- **License note:** proprietary freeware (EULA in LICENSE.txt), not open source. Some directories only list OSI-licensed servers; skip those rather than mislabel.

## 1. npm (prerequisite)

Tag `mcp-v26.8.41` in qasignoff-backend runs `.github/workflows/publish-mcp.yml` (needs the `NPM_TOKEN` secret). Check: `npm view @signoff-studio/mcp version`.

## 2. Official MCP Registry

- File: `server.json` in this repo (schema 2025-12-11; `name` equals `mcpName` in the npm package.json).
- Tool: `mcp-publisher` (GitHub releases of modelcontextprotocol/registry).
- Steps: `mcp-publisher validate` → `mcp-publisher login github` (as samuccaya) → `mcp-publisher publish`.
- Check: `curl "https://registry.modelcontextprotocol.io/v0.1/servers?search=io.github.samuccaya/signoff-studio"`
- Each new npm version: bump both `version` fields and publish again.

## 3. GitHub MCP Registry (VS Code `@mcp` gallery)

No separate submission. GitHub announced that servers self-published to the official MCP Registry appear in the GitHub MCP Registry automatically (github.blog, "Meet the GitHub MCP Registry", 2025-09; the github.com/mcp listing ids are official-registry names such as `io.github.owner/name`). Checked 2026-11-19: GitHub's docs give no other submission route. After step 2, check https://github.com/mcp?search=signoff and the VS Code Extensions view `@mcp signoff`; if it does not show within a few days, ask via GitHub Support.

## 4. Directories

| Directory | How | Notes |
|---|---|---|
| Cursor directory | Done: https://cursor.directory/plugins/signoff-studio-mcp | Submitted via "Auto (GitHub)"; the scanner reads the root `.mcp.json`. |
| Smithery | Skipped | smithery.ai now leads to Arcade's gateway builder (remote tools only), not a directory. |
| Glama | Usually indexes GitHub automatically; claim the listing | Glama runs checks on the repo; the server is a published npm package. |
| PulseMCP | Submit form | Often picks up official-registry entries. |
| mcp.so | Submit via the site (GitHub issue) | Shared copy. |
| Docker MCP Catalog | PR to docker/mcp-registry | Needs a container image; local DB/API access from a container needs host networking. Low priority. |
| awesome-mcp-servers | PR adding one line under a testing or databases section | Line below. |

awesome-mcp-servers line (match the list's emoji legend when submitting):

```
- [samuccaya/signoff-studio-mcp](https://github.com/samuccaya/signoff-studio-mcp) - Local API and database verification for AI coding agents: HTTP requests with assertions, read-only SQL on PostgreSQL/MySQL/SQL Server/Oracle/SQLite, API + DB checks in one step, checks saved to the repo.
```

## 5. Claude

- **Claude Code plugin marketplace:** this repo is the marketplace (`.claude-plugin/marketplace.json`). Users run `claude plugin marketplace add samuccaya/signoff-studio-mcp`. Separate listing in a community marketplace: optional, owner's call.
- **Claude Desktop extension (.mcpb):** built by `npm run build:mcpb` in qasignoff-backend (Windows only). Attach it to a GitHub release of this repo; directory submission follows Anthropic's extension submission process.

# SignOff Studio MCP server

Lets AI coding agents **prove an API works and that the database holds the right data**, on your machine.
Works with Claude Code, Cursor, VS Code (Copilot agent mode), Gemini CLI, Claude Desktop and any other MCP client.

```bash
npx -y @signoff-studio/mcp init      # in your project: registers the server with the agents it finds
```

- **Call APIs without curl.** `http_request` returns status, timing, the headers that matter and a compact body (large JSON comes back as its shape plus the first items), with inline checks for status, latency, headers, body text and JSON path.
- **Check the database, read-only.** `db_query` and `db_assert` run on PostgreSQL, MySQL/MariaDB, SQL Server, Oracle and SQLite. Read-only is enforced by the driver (a read-only transaction or connection), whatever the SQL says.
- **API and database in one step.** `verify_api_effect` answers "POST /orders returned 201, and did the row land?" with one verdict.
- **Checks that persist.** `save_request` and `save_db_check` write into the project's SignOff Studio workspace, so the next agent session and your teammates rerun them from git.

Runs locally over stdio. No account, no cloud relay. Secrets are redacted by value in every output.

This repository holds the public package docs, registry metadata, example configs and the Claude Code plugin. The server is built from the SignOff Studio product and published to npm as [`@signoff-studio/mcp`](https://www.npmjs.com/package/@signoff-studio/mcp).

## Install

Needs Node.js 22 or newer (or the SignOff Studio desktop app, which ships the same server and needs no Node).

`init` only adds a `signoff-studio` entry: it keeps every other server and setting, never replaces an existing entry and lists each file before writing. Options: `--dry-run`, `--agent claude,cursor,vscode,gemini|all`, `--global` (user-wide), `--agents-md` (adds a short how-to section to `AGENTS.md`).

Or register it yourself:

| Agent | Command or config |
|---|---|
| Claude Code | `claude mcp add signoff-studio -- npx -y @signoff-studio/mcp` (native Windows: `-- cmd /c npx -y @signoff-studio/mcp`) |
| Claude Code plugin | `claude plugin marketplace add samuccaya/signoff-studio-mcp` then `claude plugin install signoff-studio@signoff-studio` (adds a verification skill and `/signoff-studio:verify`) |
| Cursor | `.cursor/mcp.json`, see [examples/cursor](examples/cursor/mcp.json) |
| VS Code | `.vscode/mcp.json`, see [examples/vscode](examples/vscode/mcp.json). The SignOff Studio extension registers the server automatically. |
| Gemini CLI | `gemini mcp add signoff-studio npx -- -y @signoff-studio/mcp` (native Windows: `gemini mcp add signoff-studio cmd -- /c npx -y @signoff-studio/mcp`), or [examples/gemini](examples/gemini/settings.json) |
| Desktop app (no Node) | `"<install>\QaSignOff.exe" --mcp-stdio`; Microsoft Store install: `signoff-mcp.exe`. Or use **Connect AI agents** in the app. |

## Tools

| Tool | What it does |
|---|---|
| `workspace_status` | What the server sees: workspace, collections, environment names, DB connections, policy. |
| `http_request` | Ad-hoc HTTP request with optional inline checks. Works without a workspace. |
| `find_requests`, `get_request` | Search saved requests by name, `"POST /orders"`, URL or folder; read one. |
| `run_request`, `run_collection` | Run saved requests or a whole collection with their checks; failures show expected vs actual. |
| `get_result` | Page through a large result by `resultId`. |
| `db_connections`, `db_schema` | Workspace connections (no secrets) and a compact one-line-per-table schema. |
| `db_query` | One read-only SELECT: grid, row count, truncation flag. |
| `db_assert` | Query plus expectation (`rowCount`, `scalar`, `column contains`, `empty`): pass or fail with the actual value. |
| `db_execute` | Writes, only on connections the owner marked for agent writes, never on production; dry-run (rollback) by default. |
| `verify_api_effect` | A request plus database checks bound to its response; one verdict. |
| `save_request`, `save_db_check`, `create_environment` | Persist what the agent verified into the workspace (no overwrite unless asked). |
| `import_requests` | Import OpenAPI, Postman, Insomnia, Bruno or cURL. |
| `mock_server` | Start or stop a local mock API from a collection or spec. |
| `export_evidence` | HTML/Markdown report plus JUnit, and a short summary for the PR. |

Read tools carry `readOnlyHint`, so clients can approve them once. Response bodies and table rows are returned as data, never as instructions.

## Safety

- SQL is read-only unless the owner ticks **Allow AI agent writes** on a connection. Production-tagged connections never accept agent writes.
- Database passwords come from the connection's password env key (workspace `.env` or the environment) or, for vault-only passwords, from the running SignOff Studio app. The model never sees them.
- Every call is logged to `.signoff/agent-audit.jsonl` in the workspace (no secrets, no bodies).

## Workspace discovery

The agent's open folder (MCP roots), then walking up from the working folder for `signoff-workspace.json`, then `SIGNOFF_WORKSPACE`, then the workspace last open in the app. `--workspace <dir>` overrides. Without a workspace, `http_request` still works.

## Telemetry

Anonymous counts (which tools ran, error codes, which agent) help us fix confusing errors. No URLs, SQL, bodies or names are sent. Turn it off with `SIGNOFF_TELEMETRY=0` or `DO_NOT_TRACK=1`. Details: https://testapilocally.com/mcp#privacy

## Links

- Docs and per-agent setup: https://testapilocally.com/mcp
- SignOff Studio desktop app and VS Code extension: https://qasignoff.com
- Issues: https://github.com/samuccaya/signoff-studio-mcp/issues

© Samuccaya Tech LLP. Free to use under the license in [LICENSE.txt](LICENSE.txt).

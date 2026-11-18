## Verifying changes (SignOff Studio)

This repo has a SignOff Studio workspace (`signoff-workspace.json`) and the `signoff-studio` MCP server.

- Check an endpoint with `http_request` (inline `asserts` for status, headers, JSON path) or rerun saved ones with `run_request` / `run_collection`.
- Check data with `db_query` or `db_assert`; both are read-only. `db_schema` shows the tables.
- After an API change that writes data, `verify_api_effect` checks the response and the row in one call.
- Keep what you verified: `save_request` / `save_db_check` write into the workspace so the checks are committed and rerun later.
- `export_evidence` gives a short summary to paste into the PR.

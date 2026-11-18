---
description: Verify an endpoint or a data change with SignOff Studio (API call, database checks, evidence)
argument-hint: "[what to verify, e.g. POST /orders creates an order row]"
---

Verify this with the SignOff Studio MCP tools, following the verify-with-signoff skill: $ARGUMENTS

Start with `workspace_status`. Use `http_request` or `run_request` for the API and `db_assert` or `verify_api_effect` for the data. Report pass/fail with the actual values, and offer to save the checks (`save_request`, `save_db_check`) and to export evidence for the PR.

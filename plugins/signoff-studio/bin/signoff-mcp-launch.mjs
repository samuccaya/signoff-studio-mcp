#!/usr/bin/env node
/**
 * Starts the SignOff Studio MCP server for Claude Code (plugin .mcp.json runs `node <this file>`).
 *
 * Order: the installed desktop app (no download, no Node packages needed), else the npm package.
 *   1. Microsoft Store install: the signoff-mcp.exe app execution alias.
 *   2. Installer (EXE): QaSignOff.exe --mcp-stdio, only if that build ships the server (resources/mcp/).
 *   3. npx -y @signoff-studio/mcp (needs Node 22+; through a shell on Windows, where npx is a .cmd).
 * SIGNOFF_MCP_PREFER=npm skips 1 and 2. Arguments (e.g. --workspace <dir>) are passed through.
 * stdio is inherited, so the protocol flows straight between Claude Code and the server.
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";

const passArgs = process.argv.slice(2);

function installedApp(env = process.env) {
  if (process.platform !== "win32" || env.SIGNOFF_MCP_PREFER === "npm") return null;
  const alias = join(env.LOCALAPPDATA || "", "Microsoft", "WindowsApps", "signoff-mcp.exe");
  if (env.LOCALAPPDATA && existsSync(alias)) return { command: alias, args: [], launch: "msix" };
  const bases = [env.ProgramFiles, env["ProgramFiles(x86)"], env.LOCALAPPDATA && join(env.LOCALAPPDATA, "Programs")].filter(Boolean);
  for (const base of bases) {
    const exe = join(base, "QaSignOff", "QaSignOff.exe");
    // Builds before the MCP server shipped would open the app window instead of speaking MCP.
    if (existsSync(exe) && existsSync(join(dirname(exe), "resources", "mcp", "signoff-mcp.mjs"))) {
      return { command: exe, args: ["--mcp-stdio"], launch: "exe" };
    }
  }
  return null;
}

const app = installedApp();
const target = app || { command: "npx", args: ["-y", "@signoff-studio/mcp"], launch: "npm" };
const child = spawn(target.command, [...target.args, ...passArgs], {
  stdio: "inherit",
  shell: !app && process.platform === "win32",
  windowsHide: true,
  env: { ...process.env, SIGNOFF_MCP_LAUNCH: `plugin-${target.launch}` },
});
child.on("error", (err) => {
  process.stderr.write(`[signoff-studio plugin] could not start ${target.command}: ${err.message}. Install Node.js 22+ or the SignOff Studio app (https://qasignoff.com/download).\n`);
  process.exit(1);
});
child.on("exit", (code, signal) => process.exit(code ?? (signal ? 1 : 0)));

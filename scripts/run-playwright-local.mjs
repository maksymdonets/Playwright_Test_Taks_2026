import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");
const playwrightCli = resolve(repoRoot, "node_modules", "playwright", "cli.js");

if (!existsSync(playwrightCli)) {
  console.error("Playwright CLI was not found. Run `npm install` first.");
  process.exit(1);
}

const clean = spawn(process.execPath, [resolve(repoRoot, "scripts", "clean-reports.mjs")], {
  cwd: repoRoot,
  stdio: "inherit",
});

clean.on("exit", (cleanCode) => {
  if (cleanCode !== 0) {
    process.exit(cleanCode ?? 1);
  }

  const args = [playwrightCli, "test", ...process.argv.slice(2)];

  console.log(`Running: ${process.execPath} ${args.join(" ")}`);

  const child = spawn(process.execPath, args, {
    cwd: repoRoot,
    stdio: "inherit",
  });

  child.on("exit", (code) => {
    process.exit(code ?? 1);
  });
});


import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const repoRoot = process.cwd();
const playwrightCli = resolve(repoRoot, "node_modules", "playwright", "cli.js");
const tsxCli = resolve(repoRoot, "node_modules", "tsx", "dist", "cli.mjs");
const cleanReportsScript = resolve(repoRoot, "scripts", "clean-reports.ts");

if (!existsSync(playwrightCli)) {
  console.error("Playwright CLI was not found. Run `npm install` first.");
  process.exit(1);
}

const clean = spawn(process.execPath, [tsxCli, cleanReportsScript], {
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

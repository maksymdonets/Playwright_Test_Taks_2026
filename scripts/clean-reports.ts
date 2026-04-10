import { rm } from "node:fs/promises";

const paths = ["playwright-report", "test-results", "blob-report"];

async function main(): Promise<void> {
  await Promise.all(
    paths.map((path) =>
      rm(path, {
        force: true,
        recursive: true,
      }),
    ),
  );
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});

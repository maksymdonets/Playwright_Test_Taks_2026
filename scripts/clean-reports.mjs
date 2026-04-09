import { rm } from "node:fs/promises";

const paths = ["playwright-report", "test-results", "blob-report"];

await Promise.all(
  paths.map((path) =>
    rm(path, {
      force: true,
      recursive: true,
    }),
  ),
);


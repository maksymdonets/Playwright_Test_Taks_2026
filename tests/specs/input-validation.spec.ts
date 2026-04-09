import { test } from "../fixtures/test";
import { todoTitles } from "../support/test-data";

test.describe("Todo input validation", () => {
  test("ignores empty and whitespace-only submissions", async ({ todoPage }) => {
    await todoPage.goto();

    await todoPage.addTodo("");
    await todoPage.addTodo("   ");

    await todoPage.expectTodoCount(0);
    await todoPage.expectMainSectionHidden();
  });

  test("trims leading and trailing whitespace before save", async ({ todoPage }) => {
    await todoPage.goto();

    await todoPage.addTodo(`   ${todoTitles.trimmed}   `);

    await todoPage.expectVisibleTitles([todoTitles.trimmed]);
    await todoPage.expectItemsLeft(1);
  });
});


import { test } from "../fixtures/test";
import { buildTodoSeeds, todoTitles } from "../support/test-data";

test.describe("Todo persistence", () => {
  test("preserves created and completed state after reload", async ({ todoPage }) => {
    await todoPage.goto();
    await todoPage.addTodos([todoTitles.first, todoTitles.second]);
    await todoPage.toggleTodo(todoTitles.second);

    await todoPage.reload();

    await todoPage.expectVisibleTitles([todoTitles.first, todoTitles.second]);
    await todoPage.expectTodoActive(todoTitles.first);
    await todoPage.expectTodoCompleted(todoTitles.second);
    await todoPage.expectItemsLeft(1);
  });

  test("preserves the deep-linked filter after reload", async ({ openTodoPage, todoPage }) => {
    await openTodoPage({ filter: "active", todos: buildTodoSeeds() });

    await todoPage.expectVisibleTitles([todoTitles.first, todoTitles.third]);
    await todoPage.expectFilterSelected("active");

    await todoPage.reload();

    await todoPage.expectVisibleTitles([todoTitles.first, todoTitles.third]);
    await todoPage.expectFilterSelected("active");
    await todoPage.expectTodoHidden(todoTitles.second);
  });
});

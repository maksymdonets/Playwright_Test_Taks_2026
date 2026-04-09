import { test } from "../fixtures/test";
import { buildTodoSeeds, todoTitles } from "../support/test-data";

test.describe("Todo completion", () => {
  test("toggles a single todo between active and completed", async ({ openTodoPage, todoPage }) => {
    await openTodoPage({ todos: [{ title: todoTitles.first }] });

    await todoPage.toggleTodo(todoTitles.first);
    await todoPage.expectTodoCompleted(todoTitles.first);
    await todoPage.expectItemsLeft(0);

    await todoPage.uncheckTodo(todoTitles.first);
    await todoPage.expectTodoActive(todoTitles.first);
    await todoPage.expectItemsLeft(1);
  });

  test("marks every todo as completed through toggle-all", async ({ openTodoPage, todoPage }) => {
    await openTodoPage({ todos: buildTodoSeeds() });

    await todoPage.toggleAll();

    await todoPage.expectTodoCompleted(todoTitles.first);
    await todoPage.expectTodoCompleted(todoTitles.second);
    await todoPage.expectTodoCompleted(todoTitles.third);
    await todoPage.expectItemsLeft(0);
  });

  test("clears completed todos and keeps active todos", async ({ openTodoPage, todoPage }) => {
    await openTodoPage({ todos: buildTodoSeeds() });

    await todoPage.clearCompleted();

    await todoPage.expectVisibleTitles([todoTitles.first, todoTitles.third]);
    await todoPage.expectTodoCount(2);
    await todoPage.expectItemsLeft(2);
    await todoPage.expectTodoHidden(todoTitles.second);
  });
});

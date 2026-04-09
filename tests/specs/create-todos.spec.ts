import { test } from "../fixtures/test";
import { todoTitles } from "../support/test-data";

test.describe("Todo creation", () => {
  test("creates a single todo and resets the input", async ({ todoPage }) => {
    await todoPage.goto();

    await test.step("Create one todo", async () => {
      await todoPage.addTodo(todoTitles.first);
    });

    await test.step("Verify the new item is rendered", async () => {
      await todoPage.expectVisibleTitles([todoTitles.first]);
      await todoPage.expectItemsLeft(1);
      await todoPage.expectInputEmpty();
    });
  });

  test("creates multiple todos in order", async ({ todoPage }) => {
    const titles = [todoTitles.first, todoTitles.second, todoTitles.third];

    await todoPage.goto();
    await todoPage.addTodos(titles);

    await todoPage.expectVisibleTitles(titles);
    await todoPage.expectTodoCount(3);
    await todoPage.expectItemsLeft(3);
  });
});


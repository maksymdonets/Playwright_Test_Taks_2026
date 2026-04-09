import { test } from "../fixtures/test";
import { todoTitles } from "../support/test-data";

test.describe("Todo editing", () => {
  test("renames a todo with Enter", async ({ openTodoPage, todoPage }) => {
    await openTodoPage({ todos: [{ title: todoTitles.first }] });

    await todoPage.renameTodoWithEnter(todoTitles.first, todoTitles.edited);

    await todoPage.expectVisibleTitles([todoTitles.edited]);
    await todoPage.expectTodoHidden(todoTitles.first);
  });

  test("saves an edited todo on blur", async ({ openTodoPage, todoPage }) => {
    await openTodoPage({ todos: [{ title: todoTitles.first }] });

    await todoPage.renameTodoOnBlur(todoTitles.first, todoTitles.edited);

    await todoPage.expectVisibleTitles([todoTitles.edited]);
  });

  test("cancels editing on Escape", async ({ openTodoPage, todoPage }) => {
    await openTodoPage({ todos: [{ title: todoTitles.first }] });

    await todoPage.cancelRename(todoTitles.first, todoTitles.edited);

    await todoPage.expectVisibleTitles([todoTitles.first]);
    await todoPage.expectTodoHidden(todoTitles.edited);
  });
});

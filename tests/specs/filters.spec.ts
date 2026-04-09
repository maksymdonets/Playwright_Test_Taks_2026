import { test } from "../fixtures/test";
import { buildTodoSeeds, todoTitles } from "../support/test-data";

test.describe("Todo filters", () => {
  test("shows only active todos in the active filter", async ({ openTodoPage, todoPage }) => {
    await openTodoPage({ todos: buildTodoSeeds() });

    await todoPage.showFilter("active");

    await todoPage.expectVisibleTitles([todoTitles.first, todoTitles.third]);
    await todoPage.expectFilterSelected("active");
    await todoPage.expectTodoHidden(todoTitles.second);
  });

  test("shows only completed todos in the completed filter", async ({ openTodoPage, todoPage }) => {
    await openTodoPage({ todos: buildTodoSeeds() });

    await todoPage.showFilter("completed");

    await todoPage.expectVisibleTitles([todoTitles.second]);
    await todoPage.expectFilterSelected("completed");
    await todoPage.expectTodoHidden(todoTitles.first);
    await todoPage.expectTodoHidden(todoTitles.third);
  });

  test("returns to the full list in the all filter", async ({ openTodoPage, todoPage }) => {
    await openTodoPage({ todos: buildTodoSeeds() });

    await todoPage.showFilter("completed");
    await todoPage.showAll();

    await todoPage.expectVisibleTitles([todoTitles.first, todoTitles.second, todoTitles.third]);
    await todoPage.expectFilterSelected("all");
  });
});

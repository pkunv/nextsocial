import { expect, test } from "@playwright/test"

test("has title", async ({ page }) => {
  await page.goto("/")

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/NEXTsocial/)
})

test("about section is available", async ({ page }) => {
  await page.goto("/about")

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/About/)

  await expect(page.locator("h1")).toContainText("About")
})

test("users route contains users", async ({ page }) => {
  await page.goto("/users")

  // Assuming users are displayed in a list with the id "users-list"
  const usersList = await page.locator("#users-list")

  // Check if the users list is not empty
  const usersCount = await usersList.locator("a").count()
  expect(usersCount).toBeGreaterThan(0)
})

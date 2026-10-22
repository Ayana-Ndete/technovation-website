import { test, expect } from "@playwright/test"

for (const path of [
  "/",
  "/about",
  "/projects",
  "/portfolio",
  "/products",
  "/code-centre",
]) {
  test(`direct load and refresh: ${path}`, async ({ page }) => {
    const errors: string[] = []
    page.on("pageerror", (error) => errors.push(error.message))
    await page.goto(path)
    await expect(page.locator("h1").first()).toBeVisible()
    await expect(page.locator(".site-nav")).toBeVisible()
    await page.reload()
    await expect(page.locator("h1").first()).toBeVisible()
    expect(errors).toEqual([])
    expect(
      await page
        .locator("img")
        .evaluateAll((images) =>
          images
            .filter((image) => image.complete && image.naturalWidth === 0)
            .map((image) => image.src),
        ),
    ).toEqual([])
  })
}

test("history URL retains its anchor", async ({ page }) => {
  await page.goto("/history")
  await expect(page).toHaveURL(/\/about#history$/)
  await expect(page.locator("#history")).toBeAttached()
})

test("home mobile navigation and motion controls", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")
  await page.getByRole("button", { name: "Open menu", exact: true }).click()
  await expect(page.locator("#mobile-navigation")).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(page.locator("#mobile-navigation")).toHaveCount(0)
  await page
    .getByRole("button", { name: "Pause animation", exact: true })
    .click()
  await expect(page.locator(".hero-artwork")).toHaveClass(/is-paused/)
  await page
    .getByRole("button", { name: "Resume animation", exact: true })
    .click()
  await expect(page.locator(".hero-artwork")).not.toHaveClass(/is-paused/)
})

test("project country filters, map selection and detail dialog", async ({
  page,
}) => {
  await page.goto("/projects")
  const filters = page.locator(".px-location-list")
  await filters.getByRole("button", { name: /All projects/ }).click()
  const allCount = await page.locator(".px-project-tile").count()
  await filters.getByRole("button", { name: /Kenya/ }).click()
  expect(await page.locator(".px-project-tile").count()).toBeLessThan(allCount)
  await page.getByRole("button", { name: "Explore Tanzania projects" }).click()
  await expect(
    filters.getByRole("button", { name: /Tanzania/ }),
  ).toHaveAttribute("aria-pressed", "true")
  await page.getByRole("button", { name: "Explore project" }).click()
  await expect(page.locator("dialog")).toBeVisible()
  await page.getByRole("button", { name: "Close project details" }).click()
  await expect(page.locator("dialog")).not.toBeVisible()
})

test("Code Centre live filters and browser-local publishing", async ({
  page,
}) => {
  await page.goto("/code-centre")
  const search = page.getByRole("searchbox", { name: "Search articles" })
  await search.fill("unfindable-article")
  await expect(page.locator(".cc-card")).toHaveCount(0)
  await page.getByRole("button", { name: /Clear filters/ }).click()
  await expect(page.locator(".cc-card").first()).toBeVisible()
  await page.getByRole("button", { name: "DevOps", exact: true }).click()
  await expect(page.locator(".cc-card-icon").first()).toHaveAttribute(
    "data-topic",
    "DevOps",
  )
  await page.goto("/code-centre#java-queue-empty")
  await expect(page.locator(".cc-article-layout h1")).toBeVisible()
  await expect(page.locator(".cc-code").first()).toBeVisible()
  await page.goto("/code-centre#write")
  await page.getByLabel("Post title").fill("Nuxt migration test")
  await page.getByLabel("Your name").fill("Frontend test")
  await page
    .getByLabel("Short summary")
    .fill("Browser-local publishing still works.")
  await page
    .getByLabel("Article content")
    .fill(
      '## Check\n\nThe content is preserved.\n\n```java\nSystem.out.println("ok");\n```',
    )
  await page.reload()
  await expect(page.getByLabel("Post title")).toHaveValue("Nuxt migration test")
  await page.getByRole("button", { name: "Preview", exact: true }).click()
  await expect(page.locator(".cc-preview h2").first()).toHaveText(
    "Nuxt migration test",
  )
  await page.getByRole("button", { name: /Save post locally/ }).click()
  await expect(page.locator(".cc-article-layout h1")).toHaveText(
    "Nuxt migration test",
  )
  await page.reload()
  await expect(page.locator(".cc-article-layout h1")).toHaveText(
    "Nuxt migration test",
  )
})

for (const path of ['/about', '/projects', '/code-centre']) {
  test(`mobile navigation: ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(path)
    const toggle = page.locator('.nav-toggle')
    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expect(page.locator('.nav-mobile')).toBeVisible()
    await expect(page.locator('.nav-mobile').getByRole('link', { name: 'Home', exact: true })).toHaveAttribute('href', '/')
    await page.keyboard.press('Escape')
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })
}

test('normal-motion pages initialize without runtime errors', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  for (const path of ['/', '/about', '/projects', '/code-centre']) {
    await page.goto(path)
    await expect(page.locator('h1').first()).toBeVisible()
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight / 2))
    await expect(page.locator('.site-nav')).toBeVisible()
  }
  expect(errors).toEqual([])
})

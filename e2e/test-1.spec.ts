import { test, expect } from '@playwright/test'

test('has hero section', async ({ page }) => {
  await page.goto('http://localhost:5173/')
  await expect(page.locator('h1')).toHaveText('A day without Laughter is a day wasted')
})

test('Navigate to jokes', async ({ page }) => {
  await page.goto('http://localhost:5173/')
  await page.getByRole('link', { name: 'Jokes' }).click()
  expect(page.url()).toBe('http://localhost:5173/jokes')
})

test('Jokes Filters are visible in Jokes page', async ({ page }) => {
  await page.goto('http://localhost:5173/jokes')
  await page.getByText('Category/CategoriesAnyCustomJoke TypeSingleTwopartFlags To').click()
  await expect(
    page.getByText('Category/CategoriesAnyCustomJoke TypeSingleTwopartFlags To')
  ).toBeVisible()
})

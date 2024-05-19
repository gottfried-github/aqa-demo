import { test, expect } from '@playwright/test'
import Home from '../pages/home'
import Search from '../pages/search'

const PRODUCT_TITLE = 'Крем "Бальзам бодяга з екстрактом календули"'

test('search works correctly', async ({ page }) => {
  const pageHome = new Home(page)
  const pageSearch = new Search(page)

  await pageHome.goto()
  await pageHome.locateSearchBtn().click()

  const searchInput = pageHome.locateSearchInput()
  await expect(searchInput).toBeVisible()

  await searchInput.fill(PRODUCT_TITLE)
  await searchInput.press('Enter')

  await pageSearch.isVisible()

  const products = await pageSearch.locateProductsByTitle(PRODUCT_TITLE)

  // check that at least one product matches the search (see https://github.com/gottfried-github/aqa-demo/tree/master?tab=readme-ov-file#search)
  let atLeastOneMatches = false

  for (const product of products) {
    const text = await product.innerText()

    if (text === PRODUCT_TITLE) {
      atLeastOneMatches = true
      break
    }
  }

  expect(atLeastOneMatches).toBe(true)
})

import { test, expect } from '@playwright/test'
import Nav from '../pages/nav'
import Home from '../pages/home'
import Products from '../pages/products'

test('price filter forbids inverse range', async ({ page }) => {
  const nav = new Nav(page)
  const home = new Home(page)
  const products = new Products(page)

  await home.goto()
  await nav.gotoCategoryOne()
  await products.isVisible()

  const priceInputFrom = await products.locateVisiblePriceInputFrom()
  const priceInputTo = await products.locateVisiblePriceInputTo()

  await priceInputFrom.fill('3000')
  await priceInputTo.fill('200')

  await products.locatePriceFilterTag(3000, 200).waitFor({ state: 'visible' })

  expect(products.locatePriceFilterTag(3000, 200)).not.toBeVisible()
  await page.locator('.catalog-content').screenshot({ path: 'filtersInverseRange.png' })
})

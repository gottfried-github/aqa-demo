import { test, expect } from '@playwright/test'
import Products from '../pages/products'

test('price filter forbids inverse range', async ({ page }) => {
  const products = new Products(page)

  await products.goto()

  const priceInputFrom = await products.locateVisiblePriceInputFrom()
  const priceInputTo = await products.locateVisiblePriceInputTo()

  await priceInputFrom.fill('3000')
  await priceInputTo.fill('200')

  await products.locatePriceFilterTag(3000, 200).waitFor({ state: 'visible' })

  expect(products.locatePriceFilterTag(3000, 200)).not.toBeVisible()
  await page.locator('.catalog-content').screenshot({ path: 'filtersInverseRange.png' })
})

import { test, expect } from '@playwright/test'
import Products from '../pages/products'

/*
  from: 3000
  to: 200
  антибактеріальне
  https://makeup.com.ua/ua/categorys/20276/#o[2257][]=47617&price_from=3000&price_to=200&sort=price&direction=desc

  Shows sponsored offers
*/

test('price filter works correctly', async ({ page }) => {
  const products = new Products(page)

  await products.goto()

  const purposeFilter = await products.locateVisiblePurposeFilter()
  const priceInputFrom = await products.locateVisiblePriceInputFrom()
  const priceInputTo = await products.locateVisiblePriceInputTo()

  await purposeFilter.click()
  await priceInputFrom.fill('2000')
  await priceInputTo.fill('5000')

  const sortByPrice = await products.locateVisibleSortByPrice()
  await sortByPrice.click()

  /* sort products in ascending order */
  const sortOrderAsc = await products.locateVisibleSortOrderAsc()
  // label set value to the input
  await sortOrderAsc.label.click()
  // menu updates data and hides on change
  // await sortOrderAsc.input.dispatchEvent('input')
  await sortOrderAsc.input.dispatchEvent('change')

  // wait until product reload
  await products.locateSpinner().waitFor({ state: 'visible' })
  await products.locateSpinner().waitFor({ state: 'hidden' })

  // check lower bound
  const priceFirstAsc = await products.locateFirstProductPrice().innerText()
  expect(parseInt(priceFirstAsc, 10)).toBeGreaterThanOrEqual(2000)

  // console.log('priceFirstAsc:', priceFirstAsc)
  // await page.screenshot({ path: 'priceFirstAsc-checked.png' })

  /* sort products in descending order */
  const sortOrderDesc = await products.locateVisibleSortOrderDesc()
  await sortOrderDesc.label.click()
  // await sortOrderDesc.input.dispatchEvent('input')
  await sortOrderDesc.input.dispatchEvent('change')

  // wait until product reload
  await products.locateSpinner().waitFor({ state: 'visible' })
  await products.locateSpinner().waitFor({ state: 'hidden' })

  // check upper bound
  const priceFirstDesc = await products.locateFirstProductPrice().innerText()
  expect(parseInt(priceFirstDesc, 10)).toBeLessThanOrEqual(5000)

  // console.log('priceFirstDesc:', priceFirstDesc)
  // await page.screenshot({ path: 'priceFirstDesc-checked.png' })
})

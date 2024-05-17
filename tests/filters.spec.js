import { test, expect } from '@playwright/test'
import Products from '../pages/products'

/*
  from: 3000
  to: 200
  антибактеріальне
  https://makeup.com.ua/ua/categorys/20276/#o[2257][]=47617&price_from=3000&price_to=200&sort=price&direction=desc

  Shows sponsored offers
*/

test('test', async ({ page }) => {
  const products = new Products(page)

  await products.goto()

  const sortByPrice = await products.locateVisibleSortByPrice()
  await sortByPrice.click()

  console.log('firstProductPrice innerText:', await products.locateFirstProductPrice().innerText())
})

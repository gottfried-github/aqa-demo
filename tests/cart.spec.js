import { test, expect } from '@playwright/test'

import Nav from '../pages/nav'
import Products from '../pages/products'
import Product from '../pages/product'
import Cart from '../pages/cart'

const waitFor = timeout => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}

test('cart works properly', async ({ page }) => {
  const pageNav = new Nav(page)
  const pageProducts = new Products(page)
  const pageProduct = new Product(page)
  const pageCart = new Cart(page)

  await pageProducts.goto()

  /* pick a product, go to product page and add it to cart */
  const productOne = await pageProducts.locateProduct()

  await productOne.container.click()
  await pageProduct.isVisible()
  await pageProduct.locateBtnBuy().click()

  await pageCart.isVisible()

  // check product info in cart
  await expect(await pageCart.locateProductTitle(productOne.title)).toBeVisible()

  await pageCart.close()

  /* go to another category and add another product to cart */
  await pageNav.gotoCategoryTwo()

  const productTwo = await pageProducts.locateProduct()

  await productTwo.container.click()
  await pageProduct.isVisible()
  await pageProduct.locateBtnBuy().click()

  await pageCart.isVisible()

  // check product info in cart
  await expect(await pageCart.locateProductTitle(productOne.title)).toBeVisible()
  await expect(await pageCart.locateProductTitle(productTwo.title)).toBeVisible()

  // check that order sum is calculated correctly
  const orderSum = await pageCart.getOrderSum()
  expect(productOne.price + productTwo.price).toBe(orderSum)

  // check delete button
  await pageCart.locateBtnDelete(productOne.title).click()
  await expect(await pageCart.locateProductTitle(productOne.title)).not.toBeVisible()
})

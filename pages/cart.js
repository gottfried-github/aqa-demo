import { expect } from '@playwright/test'
export default class Cart {
  constructor(page) {
    this.page = page
  }

  async isVisible() {
    await expect(this.page.getByText('Кошик', { exact: true })).toBeVisible({ timeout: 15000 })
  }

  async close() {
    await this.page.locator('.popup__window > .popup-close.close-icon').click()
    await expect(this.page.getByText('Кошик', { exact: true })).not.toBeVisible()
  }

  async getOrderSum() {
    const sumLocator = this.page.locator('.product-list__result > .order-price > span')
    await expect(sumLocator).toBeVisible()

    const sumText = await sumLocator.innerText()
    const sumNumberText = sumText.replace('₴', '').trim()

    return parseInt(sumNumberText, 10)
  }

  locateBtnDelete(productTitle) {
    const loc = this.page
      .locator('.popup__window .popup-content .product__column', {
        hasText: productTitle,
      })
      .locator('.product__button-remove')

    return loc
  }

  async locateProductTitle(title) {
    const loc = this.page.locator('.popup__window .popup-content .product__header', {
      hasText: title,
    })

    return loc
  }
}

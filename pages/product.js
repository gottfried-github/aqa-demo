import { expect } from '@playwright/test'

export default class Product {
  constructor(page) {
    this.page = page
  }

  async isVisible() {
    await expect(this.page.getByText('Характеристики', { exact: true })).toBeVisible({
      timeout: 15000,
    })
  }

  locateBtnBuy() {
    return this.page.locator('.product-item__button .button.buy')
  }
}

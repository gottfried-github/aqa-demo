import { expect } from '@playwright/test'

export default class Search {
  constructor(page) {
    this.page = page
  }

  async isVisible() {
    await expect(
      this.page.getByRole('heading', { name: 'Результати пошуку', exact: true })
    ).toBeVisible({ timeout: 15000 })
  }

  async locateProductsByTitle(title) {
    const loc = this.page
      .locator('.catalog-products')
      .getByRole('link', { name: title, exact: true })

    return await loc.all()
  }
}

import { expect } from '@playwright/test'

export default class Home {
  constructor(page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('https://makeup.com.ua/ua/')

    expect(this.page.getByRole('link', { name: 'Парфумерія' })).toBeVisible()
  }

  async gotoProducts() {
    await this.page.getByRole('link', { name: 'Тіло і ванна' }).hover()

    const productsLink = this.page.getByRole('link', { name: 'Косметика для тіла' })

    await expect(productsLink).toBeVisible()

    await productsLink.click()
  }
}

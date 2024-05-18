import { expect } from '@playwright/test'

export default class Home {
  constructor(page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('https://makeup.com.ua/ua/')

    expect(this.page.getByRole('link', { name: 'Парфумерія' })).toBeVisible()
  }
}

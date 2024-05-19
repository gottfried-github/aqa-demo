import { expect } from '@playwright/test'

export default class Nav {
  constructor(page) {
    this.page = page
  }

  async gotoCategoryOne() {
    await this.page.getByRole('link', { name: 'Тіло і ванна' }).hover()

    const categoryLink = this.page.getByRole('link', { name: 'Косметика для тіла' })

    await expect(categoryLink).toBeVisible()

    await categoryLink.click()
  }

  async gotoCategoryTwo() {
    await this.page.getByRole('link', { name: 'Обличчя' }).hover()

    const categoryLink = this.page.getByRole('link', { name: 'Крем для обличчя' })

    await expect(categoryLink).toBeVisible()

    await categoryLink.click()
  }
}

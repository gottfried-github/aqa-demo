import { expect } from '@playwright/test'

export default class Products {
  constructor(page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('https://makeup.com.ua/ua/categorys/20276')
    await expect(
      this.page.getByRole('heading', { name: 'Косметика для тіла', exact: true })
    ).toBeVisible()
  }

  async isVisible() {
    expect(this.page.getByRole('heading', { name: 'Косметика для тіла' })).toBeVisible()
  }

  locatePriceInputFrom() {
    return this.page.getByLabel('від')
  }

  locatePriceInputTo() {
    return this.page.getByLabel('до')
  }

  locatePurposeFilter() {
    return this.page.getByLabel('Антивіковий')
  }

  locatePriceFilterTag(from, to) {
    return this.page.getByText(`від ${from} до ${to} ₴`)
  }

  async locateVisibleSortByPrice() {
    await this.page.getByText('Впорядкувати за').click()

    const sortByPrice = this.page.locator('.catalog-sort-list__item label').getByText('вартістю')

    await expect(sortByPrice).toBeVisible()

    return sortByPrice
  }

  async locateVisibleSortOrderAsc() {
    await this.page.getByText('Впорядкувати за').click()

    const sortOrderAsc = this.page
      .locator('.catalog-sort-list__item label')
      .getByText('за зростанням')

    await expect(sortOrderAsc).toBeVisible()

    return sortOrderAsc
  }

  async locateVisibleSortOrderDesc() {
    await this.page.getByText('Впорядкувати за').click()

    const sortOrderDesc = this.page
      .locator('.catalog-sort-list__item label')
      .getByText('за спаданням')

    await expect(sortOrderDesc).toBeVisible()

    return sortOrderDesc
  }

  locateFirstProductPrice() {
    return this.page.locator('.simple-slider-list__price_container .price_item').first()
  }

  locateSpinner() {
    return this.page.locator('.loading-block')
  }
}

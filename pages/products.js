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
    const loc = this.page.locator('.catalog-products')

    await expect(loc).toBeVisible()
  }

  async locateVisiblePriceInputFrom() {
    const priceInputFrom = this.page.getByLabel('від', { exact: true })
    await priceInputFrom.waitFor({ state: 'visible' })

    return priceInputFrom
  }

  async locateVisiblePriceInputTo() {
    const priceInputTo = this.page.getByLabel('до', { exact: true })
    await priceInputTo.waitFor({ state: 'visible' })
    return priceInputTo
  }

  async locateVisiblePurposeFilter() {
    const purposeFilter = this.page.locator('.catalog-checkbox-list__item', {
      hasText: 'Антивіковий',
    })
    await purposeFilter.waitFor({ state: 'visible' })

    return purposeFilter
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

  /*
    Menu contains inputs. It triggers data reload and hides on `change` events on those inputs.
    But labels set values on the inputs. Also, the inputs are always hidden and we need to make sure the labels are visible before we act on the inputs.
    So here I return both labels and inputs.
  */
  async locateVisibleSortOrderAsc() {
    await this.page.getByText('Впорядкувати за').click()

    const sortOrderAsc = this.page.locator('.catalog-sort-list__item label', {
      hasText: 'за зростанням',
    })

    await expect(sortOrderAsc).toBeVisible()

    return {
      label: sortOrderAsc,
      input: this.page.getByLabel('за зростанням'),
    }
  }

  async locateVisibleSortOrderDesc() {
    await this.page.getByText('Впорядкувати за').click()

    const sortOrderDesc = this.page.locator('.catalog-sort-list__item label', {
      hasText: 'за спаданням',
    })

    await expect(sortOrderDesc).toBeVisible()

    return {
      label: sortOrderDesc,
      input: this.page.getByLabel('за спаданням'),
    }
  }

  locateFirstProductPrice() {
    return this.page
      .locator('.catalog-products .info-product-wrapper', { hasNotText: /^Спонсоровано$/i })
      .locator('.simple-slider-list__price_container .price_item')
      .first()
  }

  async locateProduct() {
    const productFirst = this.page
      .locator('.catalog-products .simple-slider-list__link', {
        hasNotText: /^Спонсоровано$/i,
      })
      .first()

    return {
      container: productFirst,
      title: await productFirst.locator('.simple-slider-list__name').innerText(),
      price: parseInt(
        await productFirst
          .locator('.simple-slider-list__price_container .simple-slider-list__price .price_item')
          .innerText(),
        10
      ),
      btnBuy: productFirst.locator('.simple-slider-list__other-info .button.buy'),
    }
  }

  locateSpinner() {
    return this.page.locator('.catalog-products > .loading-block')
  }
}

import { openConnection, scrape } from './puppeteer'

export const extract = () => {
  return openConnection().then(({ page }) => {
    return scrape(page)
  })
}

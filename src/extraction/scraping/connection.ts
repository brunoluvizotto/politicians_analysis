import puppeteer, { Browser, Page } from 'puppeteer'

const PUPPETEER_OPTIONS = {
  headless: true,
  args: [
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--disable-setuid-sandbox',
    '--disable-infobars',
    '--no-sandbox',
    '--window-position=0,0',
    '--ignore-certifcate-errors',
    '--ignore-certifcate-errors-spki-list',
  ],
}

export const openConnection = async () => {
  const browser = await puppeteer.launch(PUPPETEER_OPTIONS)
  const page = await browser.newPage()
  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36'
  )
  await page.setViewport({ width: 1680, height: 1050 })
  return { browser, page }
}

export const closeConnection = async (page: Page, browser: Browser) => {
  page && (await page.close())
  browser && (await browser.close())
}

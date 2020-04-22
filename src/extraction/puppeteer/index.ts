import puppeteer, { Browser, Page } from 'puppeteer'

import { logger } from '../../common'

const PUPPETEER_OPTIONS = {
  headless: true,
  args: [
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--disable-setuid-sandbox',
    '--no-first-run',
    '--no-sandbox',
    '--no-zygote',
    '--single-process',
    "--proxy-server='direct://'",
    '--proxy-bypass-list=*',
    '--deterministic-fetch',
  ],
}

export const openConnection = async () => {
  const browser = await puppeteer.launch(PUPPETEER_OPTIONS)
  const page = await browser.newPage()
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
  )
  await page.setViewport({ width: 1680, height: 1050 })
  return { browser, page }
}

export const closeConnection = async (page: Page, browser: Browser) => {
  page && (await page.close())
  browser && (await browser.close())
}

export const scrape = async (page: Page) => {
  try {
    await page.goto('http://www.brunoluvizotto.com.br', {
      waitUntil: 'networkidle0',
    })
    // const websiteHtml = await page.content()
    // logger.log(websiteHtml)
  } catch (err) {
    logger.log(err)
  }
}

import { openConnection, scrape } from './puppeteer'
import { connectFirestore, getKeywords, getWebsites } from './firestore'
import { logger } from '../common'

export const extract = async (googleConfig: any) => {
  const db = connectFirestore(googleConfig)
  const websites = await getWebsites(db)
  const keywords = await getKeywords(db)
  logger.log(websites.docs[0].data())
  logger.log(keywords.docs[0].data())

  return openConnection().then(({ page }) => {
    return scrape(page)
  })
}

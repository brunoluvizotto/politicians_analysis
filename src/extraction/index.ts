import { openConnection, scrape } from './puppeteer'
import { getFirestoreData } from './firestore'
import { logger } from '../common'

export const extract = async (googleConfig: any) => {
  getFirestoreData(googleConfig).then(([websites, keywords]) => {
    logger.log(websites.docs[0].data())
    logger.log(keywords.docs[0].data())
  })

  return openConnection().then(({ page }) => {
    return scrape(page)
  })
}

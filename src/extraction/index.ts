import { scrape } from './scraping'
import { getFirestoreData } from './firestore'

export const extract = async (googleConfig: any) => {
  try {
    const { websites, keywords, onlineSentiments } = await getFirestoreData(
      googleConfig
    )
    const websiteMatches = await scrape(websites, keywords, onlineSentiments)
    return { websiteMatches, onlineSentiments }
  } catch (err) {
    throw err
  }
}

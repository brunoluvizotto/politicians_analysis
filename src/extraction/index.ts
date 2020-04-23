import { scrape } from './scraping'
import { getFirestoreData } from './firestore'

export const extract = async (googleConfig: any) => {
  try {
    const [websites, keywords] = await getFirestoreData(googleConfig)
    const websiteDocs = websites.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }))
    const keywordValues = keywords.docs.map((doc) => doc.data().value)
    const websiteMatches = await scrape(websiteDocs, keywordValues)
    return websiteMatches
  } catch (err) {
    throw err
  }
}

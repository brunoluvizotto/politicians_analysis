import {
  connectFirestore,
  getOnlineHeadlines,
  insertSentimentIfNotOnline,
  updateSentiment,
} from './firestore'
import { IWebsiteMatch } from '../common'

export const load = async (
  analysedMatches: IWebsiteMatch[],
  googleConfig: any
) => {
  const db = connectFirestore(googleConfig)
  const onlineHeadlines = await getOnlineHeadlines(db)
  for (const analysedMatch of analysedMatches) {
    for (const match of analysedMatch.matches) {
      await insertSentimentIfNotOnline(
        db,
        match.headline,
        match.translation,
        match.keywords,
        match.sentiment,
        analysedMatch.websiteName,
        onlineHeadlines
      )
    }
  }

  for (const onlineHeadline of onlineHeadlines) {
    await updateSentiment(db, onlineHeadline.text, onlineHeadline.website)
  }
}

import {
  connectFirestore,
  insertSentimentIfNotOnline,
  updateSentiment,
} from './firestore'
import { IWebsiteMatch } from '../common'

export const load = async (
  analysedMatches: IWebsiteMatch[],
  onlineSentiments: any[],
  googleConfig: any
) => {
  const db = connectFirestore(googleConfig)
  for (const analysedMatch of analysedMatches) {
    for (const match of analysedMatch.matches) {
      await insertSentimentIfNotOnline(
        db,
        match.headline,
        match.translation,
        match.keywords,
        match.sentiment,
        analysedMatch.websiteName,
        onlineSentiments
      )
    }
  }

  for (const onlineSentiment of onlineSentiments) {
    await updateSentiment(db, onlineSentiment.headline, onlineSentiment.website)
  }
}

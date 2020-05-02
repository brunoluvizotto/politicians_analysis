import { connectFirestore, insertSentiment, updateSentiment } from './firestore'
import { IWebsiteMatch } from '../common'

export const load = async (
  analyzedMatches: IWebsiteMatch[],
  onlineSentiments: any[],
  googleConfig: any
) => {
  const db = connectFirestore(googleConfig)
  for (const analyzedMatch of analyzedMatches) {
    for (const match of analyzedMatch.matches) {
      await insertSentiment(
        db,
        match.headline,
        match.translation,
        match.keywords,
        match.sentiment.magnitude,
        match.sentiment.score,
        analyzedMatch.websiteName
      )
    }
  }

  for (const onlineSentiment of onlineSentiments) {
    await updateSentiment(db, onlineSentiment.headline, onlineSentiment.website)
  }
}

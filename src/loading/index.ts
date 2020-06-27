import { connectFirestore, insertSentiment, updateSentiment } from './firestore'
import { IWebsiteMatch } from '../common'

export const load = async (
  analyzedMatches: IWebsiteMatch[],
  onlineSentiments: any[],
  googleConfig: any,
  env: string
) => {
  const db = connectFirestore(googleConfig)
  for (const analyzedMatch of analyzedMatches) {
    for (const match of analyzedMatch.matches) {
      await insertSentiment(
        db,
        match.headlinePortuguese,
        match.headlineEnglish,
        match.sentimentPortuguese,
        match.sentimentEnglish,
        match.keywords,
        analyzedMatch.websiteName,
        env
      )
    }
  }

  for (const onlineSentiment of onlineSentiments) {
    await updateSentiment(
      db,
      onlineSentiment.headlinePortuguese,
      onlineSentiment.website,
      env
    )
  }
}

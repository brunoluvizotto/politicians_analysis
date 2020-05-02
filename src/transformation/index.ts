import { getLanguageClient, analyzeSentiment } from './sentiment'
import { translate } from './translation'
import { IWebsiteMatch } from '../common'

export const transform = async (
  websiteMatches: IWebsiteMatch[],
  googleConfig: any,
  azureConfig: any
) => {
  const client = getLanguageClient(googleConfig)

  for (const websiteMatch of websiteMatches) {
    for (const match of websiteMatch.matches) {
      const res = await translate(match.headline, 'pt', 'en', azureConfig)
      const translation = res.data[0]['translations'][0]['text']
      const sentiment = await analyzeSentiment(client, translation)
      match.translation = translation
      match.sentiment = sentiment
    }
  }

  return websiteMatches
}

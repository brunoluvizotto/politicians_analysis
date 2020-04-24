import { getLanguageClient, analyseSentiment } from './sentiment'
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
      for (const headline of match.headlines) {
        const res = await translate(headline.text, 'pt', 'en', azureConfig)
        const translation = res.data[0]['translations'][0]['text']
        const sentiment = await analyseSentiment(client, translation)
        headline.translation = translation
        headline.sentiment = sentiment
      }
    }
  }

  return websiteMatches
}

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
      match.sentimentPortuguese = await analyzeSentiment(
        client,
        match.headlinePortuguese,
        'pt'
      )
      const res = await translate(
        match.headlinePortuguese,
        'pt',
        'en',
        azureConfig
      )
      match.headlineEnglish = res.data[0]['translations'][0]['text']
      match.sentimentEnglish = await analyzeSentiment(
        client,
        match.headlineEnglish,
        'en'
      )
    }
  }

  return websiteMatches
}

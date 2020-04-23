import { LanguageServiceClient, protos } from '@google-cloud/language'

import { logger, IWebsiteMatch } from '../../common'

const types = protos.google.cloud.language.v1
const { Document } = types

const connectLanguageClient = (googleConfig: any) => {
  const client = new LanguageServiceClient({
    projectId: googleConfig.projectId,
    credentials: googleConfig.credentials,
  })
  return client
}

export const analyseData = async (
  websiteMatches: IWebsiteMatch[],
  googleConfig: any
) => {
  const client = connectLanguageClient(googleConfig)

  for (const websiteMatch of websiteMatches) {
    for (const match of websiteMatch.matches) {
      for (const headline of match.headlines) {
        logger.log(`Analysing headline: ${headline}`)
        const document = {
          content: headline,
          type: Document.Type.PLAIN_TEXT,
          language: 'pt-BR',
        }
        const [result] = await client.analyzeSentiment({ document: document })
        const sentiment = result.documentSentiment
        logger.log(
          `Magnitude: ${sentiment.magnitude} | Score: ${sentiment.score}`
        )
      }
    }
  }
}

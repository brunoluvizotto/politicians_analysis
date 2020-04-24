import { LanguageServiceClient, protos } from '@google-cloud/language'

import { logger } from '../../common'

const types = protos.google.cloud.language.v1
const { Document } = types

export const getLanguageClient = (googleConfig: any) => {
  const client = new LanguageServiceClient({
    projectId: googleConfig.projectId,
    credentials: googleConfig.credentials,
  })
  return client
}

export const analyseSentiment = async (client: any, headline: string) => {
  logger.log(`Analysing headline: ${headline}`)
  const document = {
    content: headline,
    type: Document.Type.PLAIN_TEXT,
    language: 'en',
  }
  const [result] = await client.analyzeSentiment({ document: document })
  const sentiment = result.documentSentiment
  logger.log(`Magnitude: ${sentiment.magnitude} | Score: ${sentiment.score}`)
  return sentiment
}

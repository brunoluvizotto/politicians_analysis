import { Firestore } from '@google-cloud/firestore'

import { Mode } from '../enums/Mode.enum'
import { logger } from '../../common'

export const connectFirestore = (googleConfig: any) => {
  const db = new Firestore({
    projectId: googleConfig.projectId,
    credentials: googleConfig.credentials,
  })
  return db
}

export const insertSentiment = (
  db: Firestore,
  headlinePortuguese: string,
  headlineEnglish: string,
  sentimentPortuguese: {
    magnitude: number
    score: number
  },
  sentimentEnglish: {
    magnitude: number
    score: number
  },
  keywords: string[],
  website: string,
  env: string
): Promise<FirebaseFirestore.WriteResult> | void => {
  logger.log(`Inserting sentiment: ${website} | ${headlinePortuguese}`)
  if (env === Mode.PROD) {
    const sentimentsRef = db.collection('sentiments')
    return sentimentsRef.doc().set({
      headlinePortuguese,
      headlineEnglish,
      isOnline: true,
      keywords,
      sentimentMagnitudePortuguese: sentimentPortuguese.magnitude,
      sentimentScorePortuguese: sentimentPortuguese.score,
      sentimentMagnitudeEnglish: sentimentEnglish.magnitude,
      sentimentScoreEnglish: sentimentEnglish.score,
      website,
      onlineStartDate: new Date(),
    })
  }
}

export const updateSentiment = async (
  db: Firestore,
  headlinePortuguese: string,
  website: string,
  env: string
): Promise<any> => {
  logger.log(`Updating sentiment: ${website} | ${headlinePortuguese}`)
  const sentimentsRef = db.collection('sentiments')
  const snapshot = await sentimentsRef
    .where('isOnline', '==', true)
    .where('website', '==', website)
    .where('headlinePortuguese', '==', headlinePortuguese)
    .get()

  if (snapshot.empty) {
    logger.log(`Could not find sentiment: ${website} | ${headlinePortuguese}`)
  }

  if (env === Mode.PROD) {
    await Promise.all(
      snapshot.docs.map(async (doc) => {
        const docData = doc.data()
        const onlineStartDate = new Date(
          docData.onlineStartDate._seconds * 1000 +
            docData.onlineStartDate._nanoseconds / 1000000
        )
        const onlineEndDate = new Date()
        const onlineTotalTimeMS = Math.abs(
          onlineEndDate.getTime() - onlineStartDate.getTime()
        )
        const docRef = doc.ref
        return await docRef.update({
          isOnline: false,
          onlineEndDate,
          onlineTotalTimeMS,
        })
      })
    )
  }
}

import { Firestore } from '@google-cloud/firestore'

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
  headline: string,
  headlineEnglish: string,
  keywords: string[],
  sentimentMagnitude: number,
  sentimentScore: number,
  website: string
) => {
  logger.log(`Inserting sentiment: ${website} | ${headline}`)
  const sentimentsRef = db.collection('sentiments')
  return sentimentsRef.doc().set({
    headline,
    headlineEnglish,
    isOnline: true,
    keywords,
    sentimentMagnitude,
    sentimentScore,
    website,
    onlineStartDate: new Date(),
  })
}

export const updateSentiment = async (
  db: Firestore,
  headline: string,
  website: string
) => {
  logger.log(`Updating sentiment: ${website} | ${headline}`)
  const sentimentsRef = db.collection('sentiments')
  const snapshot = await sentimentsRef
    .where('website', '==', website)
    .where('headline', '==', headline)
    .get()

  if (snapshot.empty) {
    logger.log(`Could not find sentiment: ${website} | ${headline}`)
  }

  const docData = snapshot.docs[0].data()
  const onlineStartDate = new Date(
    docData.onlineStartDate._seconds * 1000 +
      docData.onlineStartDate._nanoseconds / 1000000
  )
  const onlineEndDate = new Date()
  const onlineTotalTimeMS = Math.abs(
    onlineEndDate.getTime() - onlineStartDate.getTime()
  )
  const docRef = snapshot.docs[0].ref
  await docRef.update({
    isOnline: false,
    onlineEndDate,
    onlineTotalTimeMS,
  })
}

import { Firestore } from '@google-cloud/firestore'

import { logger, IWebsiteMatch } from '../../common'

export const connectFirestore = (googleConfig: any) => {
  const db = new Firestore({
    projectId: googleConfig.projectId,
    credentials: googleConfig.credentials,
  })
  return db
}

export const getOnlineHeadlines = async (db: Firestore) => {
  const sentimentsRef = db.collection('sentiments')
  const snapshot = await sentimentsRef.where('isOnline', '==', true).get()
  if (snapshot.empty) {
    return []
  }

  const onlineHeadlinesText = snapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      text: data.headline,
      website: data.website,
    }
  })
  return onlineHeadlinesText
}

export const insertSentiment = (
  db: Firestore,
  headline: string,
  headlineEnglish: string,
  keyword: string,
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
    keyword,
    sentimentMagnitude,
    sentimentScore,
    website,
    onlineStartDate: new Date(),
  })
}

const removeItemOnce = (arr: any[], value: any) => {
  arr.splice(
    arr.findIndex((v) => v.text === value.text && v.website === value.website),
    1
  )
  return arr
}

export const insertSentimentIfNotOnline = async (
  db: Firestore,
  headline: any,
  match: any,
  analysedMatch: IWebsiteMatch,
  onlineHeadlines: any[]
) => {
  const isOnline =
    onlineHeadlines.filter((onlineHeadline) => {
      return (
        onlineHeadline.text === headline.text &&
        onlineHeadline.website === analysedMatch.websiteName
      )
    }).length > 0
  if (isOnline) {
    removeItemOnce(onlineHeadlines, {
      text: headline.text,
      website: analysedMatch.websiteName,
    })
    return
  }
  await insertSentiment(
    db,
    headline.text,
    headline.translation,
    match.keyword,
    headline.sentiment.magnitude,
    headline.sentiment.score,
    analysedMatch.websiteName
  )
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

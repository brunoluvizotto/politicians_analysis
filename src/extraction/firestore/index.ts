import { Firestore } from '@google-cloud/firestore'

const connectFirestore = (googleConfig: any) => {
  const db = new Firestore({
    projectId: googleConfig.projectId,
    credentials: googleConfig.credentials,
  })
  return db
}

export const getFirestoreData = async (googleConfig: any) => {
  const db = connectFirestore(googleConfig)
  const websitesSnapshot = await db.collection('websites').get()
  const keywordsSnapshot = await db.collection('keywords').get()
  const sentimentsSnapshot = await db
    .collection('sentiments')
    .where('isOnline', '==', true)
    .get()

  const websites = websitesSnapshot.docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }))
  const keywords = keywordsSnapshot.docs.map((doc) => doc.data().value)
  const onlineSentiments = sentimentsSnapshot.docs.map((doc) => {
    const { headline, website } = doc.data()
    return {
      headline,
      website,
    }
  })
  return { websites, keywords, onlineSentiments }
}

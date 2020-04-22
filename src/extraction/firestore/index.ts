import { Firestore } from '@google-cloud/firestore'

const connectFirestore = (googleConfig: any) => {
  const db = new Firestore({
    projectId: googleConfig.projectId,
    credentials: googleConfig.credentials,
  })
  return db
}

export const getFirestoreData = (googleConfig: any) => {
  const db = connectFirestore(googleConfig)
  const websites = db.collection('websites').get()
  const keywords = db.collection('keywords').get()
  return Promise.all([websites, keywords])
}

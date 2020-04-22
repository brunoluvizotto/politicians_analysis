import { Firestore } from '@google-cloud/firestore'

export const connectFirestore = (googleConfig: any) => {
  const db = new Firestore({
    projectId: googleConfig.projectId,
    credentials: googleConfig.credentials,
  })
  return db
}

export const getWebsites = (db: Firestore) => {
  return db.collection('websites').get()
}

export const getKeywords = (db: Firestore) => {
  return db.collection('keywords').get()
}

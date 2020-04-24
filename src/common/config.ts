export const config = {
  env: process.env.NODE_ENV,
  google: {
    projectId: process.env.GOOGLE_PROJECT_ID,
    credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
  },
  azure: {
    url: process.env.AZURE_TRANSLATION_URL,
    secretKey: process.env.AZURE_TRANSLATION_KEY,
  },
}

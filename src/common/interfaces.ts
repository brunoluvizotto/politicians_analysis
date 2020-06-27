export interface IWebsiteMatch {
  websiteName: any
  websiteId: any
  matches: Array<{
    keywords: string[]
    headlinePortuguese: string
    headlineEnglish?: string
    sentimentEnglish?: {
      magnitude: number
      score: number
    }
    sentimentPortuguese?: {
      magnitude: number
      score: number
    }
  }>
}

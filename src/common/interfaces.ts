export interface IWebsiteMatch {
  websiteName: any
  websiteId: any
  matches: Array<{
    keywords: string[]
    headline: string
    translation?: string
    sentiment?: {
      magnitude: number
      score: number
    }
  }>
}

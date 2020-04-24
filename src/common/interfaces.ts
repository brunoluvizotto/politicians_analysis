export interface IWebsiteMatch {
  websiteName: any
  websiteId: any
  matches: Array<{
    keyword: string
    headlines: Array<{
      text: string
      translation?: string
      sentiment?: {
        magnitude: number
        score: number
      }
    }>
  }>
}
;[]

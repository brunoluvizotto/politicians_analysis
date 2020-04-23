export interface IWebsiteMatch {
  websiteName: any
  websiteId: any
  matches: Array<{
    keyword: string
    headlines: string[]
  }>
}

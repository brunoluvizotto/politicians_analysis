import { analyseData } from './language'
import { IWebsiteMatch } from '../common'

export const transform = async (
  websiteMatches: IWebsiteMatch[],
  googleConfig: any
) => {
  await analyseData(websiteMatches, googleConfig)
}

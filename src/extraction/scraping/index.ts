import { Page } from 'puppeteer'

import { openConnection } from './connection'
import { logger } from '../../common'

const checkIfHeadlineIsOnline = (
  match: any,
  websiteName: string,
  onlineSentiments: any[]
) => {
  return (
    onlineSentiments.filter(
      (onlineSentiment) =>
        onlineSentiment.headline === match &&
        onlineSentiment.website === websiteName
    ).length > 0
  )
}

const cleanMatch = (match: any[]) => {
  const re = new RegExp('<.*?>', 'gm')
  return match[2].trim().replace(re, ' ')
}

const getMatchObject = (
  keywords: string[],
  matches: IterableIterator<RegExpMatchArray>,
  websiteName: string,
  onlineSentiments: any[]
) => {
  const matchesArray = Array.from(matches)
  const matchObject = []
  for (const match of matchesArray) {
    const cleanedMatch = cleanMatch(match)
    const keywordsMatched = []
    if (!checkIfHeadlineIsOnline(cleanedMatch, websiteName, onlineSentiments)) {
      for (const keyword of keywords) {
        if (cleanedMatch.indexOf(keyword) >= 0) {
          keywordsMatched.push(keyword)
        }
      }
      if (keywordsMatched.length) {
        matchObject.push({
          keywords: keywordsMatched,
          headline: cleanedMatch,
        })
      }
    }
  }
  return matchObject
}

const scrapeWebsite = async (
  page: Page,
  websiteName: string,
  website: string,
  regex: string,
  keywords: string[],
  onlineSentiments: any[]
) => {
  logger.info(`Scraping ${website}`)
  await page.goto(website, {
    waitUntil: 'domcontentloaded',
  })
  const websiteHtml = await page.content()
  const re = new RegExp(regex, 'gm')
  const matches = websiteHtml.matchAll(re)
  const matchObject = getMatchObject(
    keywords,
    matches,
    websiteName,
    onlineSentiments
  )

  logger.info(
    `Found ${matchObject.length} new match${matchObject.length > 1 ? 'es' : ''}`
  )
  return matchObject
}

export const scrape = async (
  websites: any[],
  keywords: string[],
  onlineSentiments: any[]
) => {
  logger.info('Starting websites scraping')
  const { page } = await openConnection()

  const websiteMatches = []
  for (const website of websites) {
    const match = await scrapeWebsite(
      page,
      website.data.name,
      website.data.url,
      website.data.regex,
      keywords,
      onlineSentiments
    )
    websiteMatches.push({
      websiteName: website.data.name,
      websiteId: website.id,
      matches: match,
    })
  }
  return websiteMatches
}

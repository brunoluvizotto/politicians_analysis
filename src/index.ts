import { extract } from './extraction'
import { transform } from './transformation'
import { load } from './loading'
import { logger, config } from './common'

const run = async () => {
  try {
    const { websiteMatches, onlineSentiments } = await extract(config.google)
    const analyzedData = await transform(
      websiteMatches,
      config.google,
      config.azure
    )
    await load(analyzedData, onlineSentiments, config.google, config.env)
  } catch (err) {
    logger.error(err)
    process.exit(-1)
  } finally {
    process.exit()
  }
}

run()

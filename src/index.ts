import { extract } from './extraction'
import { transform } from './transformation'
import { load } from './loading'
import { logger, config } from './common'

const run = async () => {
  try {
    const websiteMatches = await extract(config.google)
    const analysedData = await transform(
      websiteMatches,
      config.google,
      config.azure
    )
    logger.log(analysedData)
    load()
  } catch (err) {
    logger.error(err)
    process.exit(-1)
  } finally {
    process.exit()
  }
}

run()

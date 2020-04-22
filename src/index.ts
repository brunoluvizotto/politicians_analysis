import { extract } from './extraction'
import { transform } from './transformation'
import { load } from './loading'
import { logger, config } from './common'

const run = async () => {
  try {
    await extract(config.google)
    transform()
    load()
  } catch (err) {
    logger.error(err)
    process.exit(-1)
  } finally {
    process.exit()
  }
}

run()

import { extract } from './extraction'
import { transform } from './transformation'
import { load } from './loading'
import { logger } from './common'

const run = async () => {
  try {
    await extract()
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

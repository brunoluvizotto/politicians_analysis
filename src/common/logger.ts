import * as tracer from 'tracer'

export const logger = tracer.console({
  format: '{{timestamp}} {{file}}:{{line}}: {{message}}',
  dateformat: 'HH:MM:ss.L',
})

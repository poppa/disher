// Keep these import first
import { install } from 'source-map-support'
import 'reflect-metadata'
install()
import './lib/bootstrap/dotenv'

import { cyan, magenta, blue, yellow, dim } from 'chalk'
import {
  makeApp,
  shutdown,
  startHttpServer,
  trap,
  loadDbModels,
} from './lib/bootstrap'
import { logger } from './utils/log'
import { config } from './options'
import { connectToDatabase } from './lib/db'
import { setupGraphQl } from './lib/bootstrap/graphql'

const { info, error } = logger()

/**
 * Local function verifying what needs to be verified before the server
 * is started
 */
async function verify(): Promise<boolean> {
  try {
    config['server secret']
  } catch {
    error(
      `No server secret is set. Set it via the environment variable ` +
        `${cyan('DISHER_SERVER_SECRET')}`
    )

    return false
  }

  return true
}

function printDebugFlags(): void {
  if (config.debugFlags) {
    info(
      `🐛 Debug flags: %s`,
      config.debugFlags.map((d) => yellow(d.trim())).join(', ')
    )
  }
}

/**
 * Application entry point
 */
async function main(): Promise<void> {
  if (!(await verify())) {
    await shutdown(1)
  }

  printDebugFlags()

  const db = await connectToDatabase({
    host: config.db,
    retries: config['db connect retries'],
  })

  if (!db) {
    return error('Failed connecting to database. Exiting.')
  } else {
    info('🦀 Database connected')
  }

  await loadDbModels(['dist/modules/*/*.model.js'])

  const app = await makeApp()
  info('🍞 Express App is baked')

  try {
    const gql = await setupGraphQl(app)
    info(`🍳 GraphQL is cooking at ${cyan(gql.graphqlPath)}`)

    if (config.isDevelopment) {
      info(
        dim(
          `   ...GraphQL playground also available at ${cyan(gql.graphqlPath)}`
        )
      )
    }
  } catch (err) {
    error({ err }, 'GraphQL error')
    await shutdown(1)
  }

  await startHttpServer(app)
  info(
    `🍾 HTTP ready to serve on ${magenta(config.host)}:${blue(config.port)}` +
      ` (pid: ${cyan(process.pid)})`
  )

  trap()
}

// Only run if we're the entry point
if (!module.parent) {
  main().catch((e) => console.error(e, 'Run server'))
}

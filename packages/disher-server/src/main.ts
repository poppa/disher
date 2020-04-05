import './dotenv'
import { makeApp } from './app'
import { startHttpServer } from './http-server'
import { logger } from './utils/log'
import { config } from './options'
import { trap, shutdown } from './trap'
import { connectToDatabase } from './db'

const { info, error } = logger()

async function verify(): Promise<boolean> {
  try {
    config['server secret']
  } catch {
    error(
      `No server secret is set. Set it via the environment variable ` +
        `DISHER_SERVER_SECRET`
    )

    return false
  }

  return true
}

async function main(): Promise<void> {
  if (!(await verify())) {
    await shutdown(1)
  }

  const db = await connectToDatabase({
    host: config.db,
    retries: config['db connect retries'],
  })

  if (!db) {
    return error('Failed connecting to database. Exiting.')
  } else {
    info('Database connected')
  }

  const app = makeApp()
  info('Express App created')

  await startHttpServer(app)
  info(
    `HTTP server listening on ${config.host}:${config.port} ` +
      ` (pid: ${process.pid})`
  )

  trap()
}

// Only run if we're the entry point
if (!module.parent) {
  main().catch((e) => console.error(e, 'Run server'))
}

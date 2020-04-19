import express, { RequestHandler } from 'express'
import compression from 'compression'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import connectMongo from 'connect-mongo'
import session from 'express-session'
import { Undefinable, PlainObject } from '../../utils/types'
import { getDebugLogger, logger } from '../../utils/log'
import { db, connection } from '../db'
import { shutdown } from './shutdown'
import { config } from '../../options'

const debug = getDebugLogger('bootstrap').extend('app')
const { warn } = logger()

let app_: Undefinable<express.Application>

async function setupSession(): Promise<RequestHandler> {
  let sessionStore: Undefinable<connectMongo.MongoStoreFactory>
  let mongoStore: Undefinable<connectMongo.MongoStore>

  if (db()) {
    sessionStore = connectMongo(session)

    const ssOptions: PlainObject = {
      mongooseConnection: connection(),
      touchAfter: 24 * 3600,
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    mongoStore = new sessionStore(ssOptions)
  } else {
    warn('No Database available. Unable to seup session store')
    await shutdown(1)
  }

  if (!sessionStore) {
    warn('No session store created')
    await shutdown(1)
  }

  const exp = 3600 * 24 * 365 * 10 * 1000

  const sessConf: session.SessionOptions = {
    secret: config['server secret'],
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
    cookie: {
      secure: false,
    },
  }

  if (exp && sessConf.cookie) {
    debug('Session expires:', new Date(exp))
    sessConf.cookie.maxAge = exp
  }

  debug(sessConf)

  return session(sessConf)
}

/**
 * Returns the Express application
 * @throws An error is thrown if no app is created yet
 */
export function app(): express.Application {
  if (!app_) {
    throw new Error('Trying to get `app` before it has been instantiated')
  }

  return app_
}

/**
 * Bootstraps the Express application
 */
export async function makeApp(): Promise<express.Application> {
  app_ = express()

  if (config.isProduction) {
    app_.set('trust proxy', 1)
  }

  app_.enable('case sensitive routing')
  app_.use(await setupSession())
  app_.use(compression())
  app_.use(helmet({ hidePoweredBy: true }))
  app_.use(express.raw())
  app_.use(express.text())
  app_.use(express.json())
  app_.use(express.urlencoded({ extended: true }))
  app_.use(cookieParser())

  return app_
}

import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { Undefinable } from './utils/types'

let app_: Undefinable<express.Application>

export function app(): express.Application {
  if (!app_) {
    throw new Error('Trying to get `app` before it has been instantiated')
  }

  return app_
}

export function makeApp(): express.Application {
  // FIXME: Setup session and what not
  app_ = express()
  app_.enable('case sensitive routing')
  app_.use(compression())
  app_.use(helmet({ hidePoweredBy: true }))
  app_.use(express.raw())
  app_.use(express.text())
  app_.use(express.json())
  app_.use(express.urlencoded({ extended: true }))
  app_.use(cookieParser())

  return app_
}

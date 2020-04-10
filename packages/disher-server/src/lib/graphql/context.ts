import { ContextFunction } from 'apollo-server-core'
import express from 'express'

interface ExpressContext {
  req: express.Request
  res: express.Response
}

export type Context = ExpressContext

export const context: ContextFunction<Context, object> = ({ req, res }) => {
  return { req, res }
}

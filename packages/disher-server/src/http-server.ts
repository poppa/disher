import http, { Server } from 'http'
import { Application } from 'express'
import { config } from './options'
import { Undefinable } from './utils/types'
import { logger } from './utils/log'

let server: Undefinable<Server>

export function getHttpServer(): Server {
  if (!server) {
    throw new Error('Trying to get HTTP server before it has been inistialized')
  }

  return server
}

export async function stopHttpServer(): Promise<void> {
  await new Promise((resolve) => {
    server?.close((err) => {
      if (err) {
        logger().error({ err }, 'Error closing server')
      }

      resolve()
    })
  })
}

export async function startHttpServer(app: Application): Promise<Server> {
  return new Promise<Server>((resolve) => {
    const listener = http.createServer(app).listen(
      {
        port: config.port,
        host: config.host,
      },
      () => {
        server = listener
        resolve(server)
      }
    )
  })
}

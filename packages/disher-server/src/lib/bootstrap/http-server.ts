import http, { Server } from 'http'
import { Application } from 'express'
import { config } from '../../options'
import { Undefinable } from '../../utils/types'
import { logger } from '../../utils/log'

let server: Undefinable<Server>

/**
 * Returns the HTTP server instance
 *
 * @throws An error if no server instance is created yet
 */
export function getHttpServer(): Server {
  if (!server) {
    throw new Error('Trying to get HTTP server before it has been inistialized')
  }

  return server
}

/**
 * Stop the HTTP server
 */
export async function stopHttpServer(): Promise<void> {
  await new Promise((resolve) => {
    if (server) {
      server.close((err) => {
        if (err) {
          logger().error({ err }, 'Error closing server')
        }

        resolve()
      })
    } else {
      resolve()
    }
  })
}

/**
 * Start the HTTP server
 *
 * @param app - The Express application serving as request listener
 * @returns The server instance created
 */
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

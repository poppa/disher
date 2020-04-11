import express, { Application, Handler } from 'express'
import { cyan } from 'chalk'
import { dirname } from 'path'
import deepmerge from 'deepmerge'
import { ServeStaticOptions } from 'serve-static'
import { config } from '../../options'
import { logger, getDebugLogger } from '../../utils/log'
import { isAdministrator } from '../../modules/user'

const debug = getDebugLogger('bootstrap').extend('routes')
const { info, warn } = logger()

function getStaticMountpoint(
  path: string,
  options?: ServeStaticOptions
): Handler {
  const mp = express.static(
    path,
    deepmerge(
      {
        dotfiles: 'deny',
      },
      options || {}
    )
  )

  return mp
}

async function mountAdminUi(app: Application): Promise<void> {
  const adminPath = require.resolve('@poppanator/disher-admin')
  debug(`Resolved Admin UI package?:`, adminPath)

  if (adminPath) {
    const ap = `${dirname(adminPath)}/dist`
    debug(`Serving static files from ${ap}`)

    const mnt = config.adminUiPath
    const handler = getStaticMountpoint(ap)

    app.use(mnt, handler)
    app.get(`${mnt}*`, (req, res, next) => {
      if (!req.user || !isAdministrator(req.user)) {
        return res.redirect(mnt)
      }

      next()
    })

    info(`Admin UI will be simmering at ${cyan(mnt)}`)
  } else {
    warn(`Failed resolving Admin UI package`)
  }
}

export async function mountRoutes(app: Application): Promise<void> {
  if (!config.noAdminUi) {
    await mountAdminUi(app)
  } else {
    info(`Without Admin UI`)
  }
}

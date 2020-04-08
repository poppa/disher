import { globRequire } from '../../utils/glob-require'
import { logger } from '../../utils/log'
import { cyan, dim, yellow } from 'chalk'
import { stripCwd } from '../../utils'

const log = logger()
const { info } = log

export async function loadDbModels(globPath: string | string[]): Promise<void> {
  info(`🌽 Loading db models...`)

  const mods = await globRequire(
    globPath,
    (s) => info(`   ${dim('...')}${yellow(stripCwd(s, 6))}`),
    log
  )

  if (mods) {
    info(`🥦 Loaded ${cyan(mods.length + '')} DB models`)
  }
}

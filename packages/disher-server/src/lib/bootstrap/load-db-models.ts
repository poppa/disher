import {
  globRequire,
  RequireModule,
  FormatFunction,
} from '../../utils/glob-require'
import { logger } from '../../utils/log'
import { Undefinable } from '../../utils'

const log = logger()

export async function loadDbModels(
  globPath: string | string[],
  fmt?: FormatFunction
): Promise<Undefinable<RequireModule[]>> {
  const mods = await globRequire(globPath, fmt, log)
  return mods
}

import { promises as fs } from 'fs'
import { PackageJSON } from 'package-json'
import { Maybe } from './types'
import { logger } from './log'

let packageJson: Maybe<PackageJSON>
const { error } = logger()

export async function loadPackageJson(): Promise<void> {
  try {
    const data = await fs.readFile('package.json')
    packageJson = JSON.parse(data.toString('utf-8')) as PackageJSON
  } catch (e) {
    error({ err: e }, 'loadPackageJson()')
  }
}

export function getPackageJson(): PackageJSON {
  if (!packageJson) {
    throw new Error(`getPackageJson() called before loadPackageJson()`)
  }

  return packageJson
}

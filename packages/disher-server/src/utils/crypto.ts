import { createHmac } from 'crypto'
import { hashSync } from 'bcrypt'
import { config } from '../options'

export function sha256(str: string): string {
  return createHmac('sha256', str).digest('hex')
}

export function sha512(str: string): string {
  return createHmac('sha512', str).digest('hex')
}

export function bcryptSync(str: string): string {
  return hashSync(str, config['server secret'])
}

import { createHmac } from 'crypto'

export function sha256(str: string): string {
  return createHmac('sha256', str).digest('hex')
}

export function sha512(str: string): string {
  return createHmac('sha512', str).digest('hex')
}

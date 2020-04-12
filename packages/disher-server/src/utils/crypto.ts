import { Types } from 'mongoose'
import { createHmac } from 'crypto'
import { config } from '../options'
import * as jwt from './jwt'

export function sha256(str: string): string {
  return createHmac('sha256', str).digest('hex')
}

export function sha512(str: string): string {
  return createHmac('sha512', str).digest('hex')
}

export function hashSha512(str: string): string {
  return createHmac('sha512', config['server secret']).update(str).digest('hex')
}

export interface GenerateJwtTokenProps {
  id: string | Types.ObjectId
}

export async function generateJwtToken(
  input: GenerateJwtTokenProps
): Promise<string> {
  const token = await jwt.sign(input, config['server secret'])
  return token
}

export interface VerifyJwtTokenResult {
  id: string
  iat: number
}

export async function verifyJwtToken(
  token: string
): Promise<VerifyJwtTokenResult> {
  const res = await jwt.verify<VerifyJwtTokenResult>(
    token,
    config['server secret']
  )

  if (typeof res === 'string') {
    throw new Error(`Malformed JWT ${token}`)
  } else {
    return res
  }
}

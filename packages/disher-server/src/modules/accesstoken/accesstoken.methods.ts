import { Types } from 'mongoose'
import Model, { AccessToken, AccessTokenDocument } from './accesstoken.model'
import { AddTokenArgs } from './accesstoken.args'
import { isUser, UserDocument } from '../user'
import { objectId, assertId } from '../../lib/db'
import { logger } from '../../utils/log'
import { Undefinable, generateJwtToken, verifyJwtToken } from '../../utils'
import { stringToDate } from '../../utils/date'

const { error } = logger()

export async function generateToken(
  user: string | Types.ObjectId | UserDocument
): Promise<string> {
  if (isUser(user)) {
    user = objectId(user._id)
  } else {
    user = objectId(user)
  }

  const token = await generateJwtToken({ id: user })
  return token
}

export async function addToken(
  token: AccessToken | AddTokenArgs
): Promise<AccessTokenDocument> {
  try {
    if (token.expires && typeof token.expires === 'string') {
      token.expires = stringToDate(token.expires)
    }

    assertId(token)

    if (!isUser(token.user)) {
      token.user = objectId(token.user)
    } else {
      token.user = objectId(token.user._id)
    }

    return (await Model.create(token)).populate('user').execPopulate()
  } catch (err) {
    error({ err }, 'addToken(%o)', token)
    throw err
  }
}

export async function refreshToken(): Promise<void> {
  //
}

export async function getToken(
  token: string
): Promise<Undefinable<AccessToken>> {
  try {
    const jwt = await verifyJwtToken(token)

    if (!jwt) {
      throw new Error(`FIXME: This should be handled in some other way`)
    }

    const res = await Model.findOne({ token }).populate('user').lean()
    return res || undefined
  } catch (err) {
    error({ err }, 'getToken(%o)', token)
    throw err
  }
}

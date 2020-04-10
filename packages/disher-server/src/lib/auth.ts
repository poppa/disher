import express from 'express'
import { Scope, validateScope } from './scope'
import { config } from '../options'
import { UserDocument, getUserByToken, isAdministrator } from '../modules/user'
import { Types } from 'mongoose'
import { logger } from '../utils/log'
import { HttpError } from '../error'

const { warn } = logger()

export interface AuthUserProps {
  apiKey: string
  scopes?: Scope[]
}

export interface AuthUserFromRequestProps
  extends Omit<AuthUserProps, 'apiKey'> {
  req: express.Request
}

const NoUser: UserDocument = {
  _id: new Types.ObjectId(),
  enabled: true,
  name: 'Any User',
  handle: 'anonymous',
  scope: ['admin'],
}

export async function authUserByApiKey({
  apiKey,
  scopes,
}: AuthUserProps): Promise<UserDocument> {
  if (config.authDisabled) {
    return NoUser
  }

  const u = await getUserByToken(apiKey)

  if (!u) {
    throw new HttpError(HttpError.Unauthorized)
  }

  if (!isAdministrator(u) && !validateScope(u.scope, scopes as Scope[])) {
    warn(`User ${u.name} has no access to required scope(s) %o`, scopes)

    throw new HttpError(HttpError.Unauthorized)
  }

  return u
}

export async function authUserFromRequest({
  req,
  scopes,
}: AuthUserFromRequestProps): Promise<UserDocument> {
  if (config.authDisabled) {
    return NoUser
  }

  if (
    req.session &&
    req.session.user &&
    (isAdministrator(req.session.user) ||
      validateScope(req.session.user.scope, scopes))
  ) {
    return req.session.user
  }

  const bearer = req.headers.authorization

  if (!bearer || !bearer.toLowerCase().startsWith('bearer')) {
    throw new HttpError(HttpError.BadRequest)
  }

  const key = bearer.split(' ')[1]
  return authUserByApiKey({ apiKey: key, scopes })
}

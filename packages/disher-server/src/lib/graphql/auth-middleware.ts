import { AuthChecker } from 'type-graphql'
import { Context } from './context'
import { authUserFromRequest } from '../auth'
import { Scope } from '../scope'
import { logger } from '../../utils/log'

const { error } = logger()

export const authMiddleware: AuthChecker<Context> = async (
  { context },
  roles
) => {
  try {
    const x = await authUserFromRequest({
      req: context.req,
      scopes: roles as Scope[],
    })
    context.req.user = x
    return true
  } catch (err) {
    error({ err }, 'Authentication error')
    return false
  }
}

import { GraphQLClient } from 'graphql-request'
import { appenv } from '$lib/backend/env'
import { userJwtFromCookie } from '$lib/backend'

export const defaultGqlClient = new GraphQLClient(
  appenv('DISHER_API_ENDPOINT'),
  {
    headers: {
      Authorization: `Bearer ${appenv('DISHER_API_USER_JWT')}`,
    },
  }
)

export function getUserGqlClient(
  headersOrRawCookie: Record<string, string> | string
): GraphQLClient {
  const jwt = userJwtFromCookie(headersOrRawCookie)

  if (!jwt) {
    // FIXME: Better error
    throw new Error(`User not authenticated`)
  }

  return new GraphQLClient(appenv('DISHER_API_ENDPOINT'), {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
}

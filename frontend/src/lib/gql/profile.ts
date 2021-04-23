import type { Maybe } from '$types/index'
import { gql } from 'graphql-request'
import { defaultGqlClient } from './client'

// FIXME: Auto-generate GQL types
interface BackendUser {
  id: string
  email: string
  username: string
  gravatar?: string
  avatar?: {
    url: string
  }
}

const query = gql`
  query UserProfile($id: ID!) {
    user(id: $id) {
      id
      email
      username
      avatar {
        url
      }
      gravatar
    }
  }
`

export async function getUserProfile(id: string): Promise<Maybe<BackendUser>> {
  try {
    const res = await defaultGqlClient.request<{ user: BackendUser }>(query, {
      id,
    })
    return res.user
  } catch (err: unknown) {
    console.error('getUserProfile(%O):', err)
    return undefined
  }
}

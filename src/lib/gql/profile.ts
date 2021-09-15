import type { Maybe } from '$types/index'
import { gql } from 'graphql-request'
import { defaultGqlClient } from './client'

// FIXME: Auto-generate GQL types
// FIXME: This is soo porly named
interface BackendUser {
  id: string
  email: string
  username: string
  gravatar?: string
  avatar?: {
    url: string
  }
}

const simpleQuery = gql`
  query SimpleUserProfile($id: ID!) {
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

const fullQuery = gql`
  query FullUserProfile($id: ID!) {
    user(id: $id) {
      id
      email
      username
      avatar {
        url
      }
      gravatar
      fullname
      bio
      role {
        id
        name
        description
      }
    }
  }
`

export async function getSimpleUserProfile(
  id: string
): Promise<Maybe<BackendUser>> {
  try {
    const res = await defaultGqlClient.request<{ user: BackendUser }>(
      simpleQuery,
      {
        id,
      }
    )
    return res.user
  } catch (err: unknown) {
    console.error('getUserProfile(%O):', err)
    return undefined
  }
}

export async function getFullUserProfile(
  id: string
): Promise<Maybe<BackendUser>> {
  try {
    const res = await defaultGqlClient.request<{ user: BackendUser }>(
      fullQuery,
      {
        id,
      }
    )
    return res.user
  } catch (err: unknown) {
    console.error('getUserProfile(%O):', err)
    return undefined
  }
}

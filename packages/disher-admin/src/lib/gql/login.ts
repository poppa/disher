import { gql } from 'apollo-boost'
import { client } from './client'
import { Login, LoginVariables } from './types/Login'
import { Maybe } from '../../types'
import { errorStore } from '../../storage'
import { DisherError } from '../error'
import { IsLoggedIn } from './types/IsLoggedIn'

const loginQuery = gql`
  query Login($username: String!, $password: String!) {
    login(handle: $username, password: $password) {
      name
    }
  }
`

const isLoggedInQuery = gql`
  query IsLoggedIn {
    isLoggedIn
  }
`

export async function login(args: LoginVariables): Promise<Maybe<string>> {
  try {
    const res = await client.query<Login>({
      query: loginQuery,
      variables: args,
    })

    if (res.data.login) {
      return res.data.login.name
    }

    throw new Error('Unknown user')
  } catch (e) {
    errorStore.push(DisherError.error(e.message))
    return undefined
  }
}

export async function isLoggedIn(): Promise<boolean> {
  try {
    const res = await client.query<IsLoggedIn>({ query: isLoggedInQuery })
    return res.data.isLoggedIn
  } catch (e) {
    errorStore.push(DisherError.fatal(e.message))
    return false
  }
}

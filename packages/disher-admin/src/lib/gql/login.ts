/* eslint-disable @typescript-eslint/camelcase */

import { gql } from 'apollo-boost'
import { client } from './client'
import { Login, LoginVariables, Login_login } from './types/Login'
import { Maybe } from '../../types'
import { errorStore } from '../../storage'
import { DisherError } from '../error'
import { IsLoggedIn } from './types/IsLoggedIn'
import { Logout } from './types/Logout'

const loginQuery = gql`
  query Login($username: String!, $password: String!) {
    login(handle: $username, password: $password) {
      name
      handle
    }
  }
`

const isLoggedInQuery = gql`
  query IsLoggedIn {
    isLoggedIn
  }
`

const logoutQuery = gql`
  query Logout {
    logout
  }
`

export async function login(args: LoginVariables): Promise<Maybe<Login_login>> {
  try {
    const res = await client.query<Login>({
      query: loginQuery,
      variables: args,
    })

    if (res.data.login) {
      return res.data.login
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

export async function logout(): Promise<boolean> {
  try {
    const res = await client.query<Logout>({ query: logoutQuery })
    return res.data.logout
  } catch (e) {
    console.error('Logout error:', e)
    return false
  }
}

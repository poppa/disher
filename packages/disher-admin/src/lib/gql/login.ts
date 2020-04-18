import { gql } from 'apollo-boost'
import { client } from './client'

interface LoginArgs {
  username: string
  password: string
}

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

export async function login(args: LoginArgs): Promise<void> {
  try {
    const res = await client.query({
      query: loginQuery,
      variables: args,
    })

    console.log(`Result:`, res)
    // return res.data
  } catch (e) {
    console.error('Error:', e)
  }
}

export async function isLoggedIn(): Promise<void> {
  try {
    const res = await client.query({ query: isLoggedInQuery })
    console.log(`Is logged in res:`, res)
  } catch (e) {
    console.error('Error:', e)
  }
}

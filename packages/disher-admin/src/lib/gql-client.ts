import Apollo, { gql } from 'apollo-boost'

const cli = new Apollo({
  uri: 'http://localhost:9999/graphql',
})

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

export async function login(args: LoginArgs): Promise<void> {
  try {
    const res = await cli.query({
      query: loginQuery,
      variables: args,
    })

    console.log(`Result:`, res)
  } catch (e) {
    console.error('Error:', e)
  }
}

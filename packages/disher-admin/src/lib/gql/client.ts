import Apollo from 'apollo-boost'

export const client = new Apollo({
  uri: 'http://localhost:9999/graphql',
  credentials: 'include',
})

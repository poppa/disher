export interface Result {
  jwt: string
  user: User
}

export interface User {
  __v: number
  _id: string
  blocked: boolean
  confirmed: boolean
  createdAt: string
  email: string
  id: string
  provider: string
  role: Role
  updatedAt: string
  username: string
}

export interface Role {
  __v: number
  _id: string
  description: string
  id: string
  name: string
  type: string
}

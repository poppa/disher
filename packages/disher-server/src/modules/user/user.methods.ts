import { Types } from 'mongoose'
import Model, { UserDocument, User } from './user.model'
import { Scope } from '../../lib/scope'
import { Undefinable } from '../../utils/types'
import { logger } from '../../utils/log'
import { objectId } from '../../lib/db'
import { getToken } from '../accesstoken'

const { error } = logger()

export function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' && obj !== null && 'name' in obj && 'handle' in obj
  )
}

export function userIs(user: unknown, type: Scope): boolean {
  return isUser(user) && user.scope.includes(type)
}

export function isAdministrator(user: UserDocument | User): boolean {
  return (isUser(user) && user.scope && user.scope.includes('admin')) || false
}

export async function getUserByToken(
  token: Undefinable<string>
): Promise<Undefinable<UserDocument>> {
  if (!token) {
    return undefined
  }

  try {
    const r = await getToken(token)

    if (r) {
      return r.user as UserDocument
    }

    return undefined
  } catch (err) {
    error({ err }, `getUserByToken(${token})`)
    return undefined
  }
}

export async function findUser(
  args: Partial<User>
): Promise<Undefinable<UserDocument>> {
  try {
    const r = await Model.findOne(args).lean()
    return r || undefined
  } catch (err) {
    error({ err }, 'findUser()')
    return undefined
  }
}

export async function getUserById(
  id: string | Types.ObjectId
): Promise<Undefinable<UserDocument>> {
  try {
    const res: Undefinable<UserDocument> | null = await Model.findById(
      objectId(id)
    ).lean()

    return res || undefined
  } catch (err) {
    error({ err }, `getUserById(${id})`)
    return undefined
  }
}

export async function getUsers(): Promise<User[]> {
  try {
    return await Model.find({}).lean()
  } catch (err) {
    error({ err }, 'Error querying db for all users')
    throw err
  }
}

export async function addUser(user: User): Promise<UserDocument> {
  try {
    if (!user._id) {
      user._id = objectId()
    }

    return Model.create(user)
  } catch (err) {
    error({ err }, `Failed adding user`)
    throw err
  }
}

export async function updateUser(
  id: string | Types.ObjectId,
  user: Partial<User>
): Promise<UserDocument> {
  try {
    if (user._id) {
      delete user._id
    }

    const res = await Model.findByIdAndUpdate(objectId(id), user)

    if (res) {
      const preUser: UserDocument = res.toObject()

      return {
        ...preUser,
        ...user,
      }
    }

    throw new Error(`User not found`)
  } catch (err) {
    error({ err }, `Failed updating user`)
    throw err
  }
}

export async function deleteUser(
  id: string | Types.ObjectId
): Promise<boolean> {
  try {
    const res = await Model.findByIdAndDelete(objectId(id))
    return !!res
  } catch (err) {
    error({ err }, `Failed deleting user ${id}`)
    throw err
  }
}

export async function hasUsers(): Promise<boolean> {
  const res = await Model.countDocuments()
  return res > 0
}

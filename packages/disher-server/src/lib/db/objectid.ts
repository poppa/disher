import { Types } from 'mongoose'

interface WithId {
  _id?: Types.ObjectId | string
}

/**
 * Check if `t` is an `mongoose` `ObjectId`
 * @param t
 */
export function isObjectId(t: unknown): t is Types.ObjectId {
  return typeof t === 'object' && t !== null && t instanceof Types.ObjectId
}

/**
 * Converts `s` into an `ObjectId`
 * @param s
 */
export function objectId<T extends Types.ObjectId | string>(
  s?: T
): Types.ObjectId {
  if (isObjectId(s)) {
    return s
  }

  if (typeof s === 'string') {
    return new Types.ObjectId(s)
  }

  return new Types.ObjectId()
}

/**
 * Asserts that `obj` has the property `_id` and that it is an `ObjectId`
 * instance
 * @param obj
 */
export function assertId<T extends unknown>(obj: T): T {
  if (typeof obj === 'object' && obj !== null && !('_id' in obj)) {
    ;(obj as WithId)._id = new Types.ObjectId()
  }

  if (!isObjectId((obj as WithId)._id)) {
    ;(obj as WithId)._id = objectId((obj as WithId)._id)
  }

  return obj
}

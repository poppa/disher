import { ObjectType, Field } from 'type-graphql'
import { PlainObject } from '../../utils'

@ObjectType()
export class KeyValuePair<T extends string> {
  @Field()
  public key!: string

  @Field()
  public value!: T
}

export function objectToKeyValuePair<X extends string, T extends PlainObject>(
  obj: T
): KeyValuePair<X>[] {
  const out: KeyValuePair<X>[] = []

  for (const [key, val] of Object.entries(obj)) {
    out.push({
      key,
      value: val as X,
    })
  }

  return out
}

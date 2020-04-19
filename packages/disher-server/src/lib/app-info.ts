/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getPackageJson, Maybe, PlainObject } from '../utils'
import { Author as JAuthor } from 'package-json'
import { ObjectType, Field } from 'type-graphql'
import { KeyValuePair, objectToKeyValuePair } from './graphql/types'

@ObjectType()
export class Author implements JAuthor {
  @Field()
  name!: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  homepage?: string
}

@ObjectType()
export class AppInfo {
  @Field()
  name!: string

  @Field()
  version!: string

  @Field(() => Author)
  author!: Author

  @Field()
  repository!: string

  @Field()
  license!: string

  @Field(() => [Author], { nullable: true })
  contributors?: Author[]

  @Field(() => [KeyValuePair])
  dependencies!: KeyValuePair<string>[]
}

export function appInfo(): AppInfo {
  const pj = getPackageJson()

  const info: AppInfo = {
    name: pj.name,
    version: pj.version!,
    author: pj.author as Author,
    repository: pj.repository as string,
    license: pj.license!,
    contributors: pj.contributors as Maybe<Author[]>,
    dependencies: objectToKeyValuePair(pj.dependencies as PlainObject),
  }

  return info
}

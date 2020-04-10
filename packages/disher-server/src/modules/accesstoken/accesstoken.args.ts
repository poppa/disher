import { ArgsType, Field } from 'type-graphql'

@ArgsType()
export class AddTokenArgs {
  @Field(() => String, {
    description: 'The id of the user to add the token for',
  })
  public user!: string

  @Field(() => String, {
    description: 'The expiration date of the token as a ISO-8601 date string',
  })
  public expires!: string
}

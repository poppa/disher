#!/bin/bash
yarn run apollo codegen:generate                                            \
  --localSchemaFile=graphql-schema.json                                     \
  --target=typescript                                                       \
  --includes=packages/disher-admin/src/**/*.ts                              \
  --tagName=gql                                                             \
  --addTypename                                                             \
  --globalTypesFile=packages/disher-admin/src/types/graphql-global-types.ts \
  types

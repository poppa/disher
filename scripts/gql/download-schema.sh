#!/bin/bash
yarn run apollo schema:download \
  --endpoint=http://localhost:9999/graphql \
  graphql-schema.json

#!/bin/sh
export PG_DATABASE_URL=postgres://postgres:twenty@$PG_DATABASE_HOST:$PG_DATABASE_PORT/default
yarn database:init:prod
node dist/src/main

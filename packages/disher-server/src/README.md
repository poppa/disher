# Disher Server

The base HTTP server of Disher

## Configuration

Most config options can be set via environment variables.

- **`DISHER_HOST`** -
  Set the hostname the server will listen to. Default is `localhost`

- **`DISHER_PORT`** -
  The port the server will listen to. Default is `9999`

- **`DISHER_DB`** -
  The MongoDB connection string. Default is `mongodb://localhost/disher`

- **`DISHER_DB_CONNECT_RETRIES`** -
  Number of times the server will try to connect to the database if the initail
  connection failes. After this the process is terminated. Default is `20`

- **`DISHER_ETC_PATH`** -
  The path to the `etc` directory. This is where the server will store
  persitent data. If it doesn't exist when the server is started for the first
  time it will be created. Default is `[cwd]/etc`

- **`DISHER_SHUTDOWN_GRACETIME`**
  When the server is stopped with `SIGINT` or `SIGTERM` the server will be
  gracefully shut down, e.g. we will try to close various services before
  exiting the process. But if this takes to long the server process will be
  forcefully closed after this many milliseconds.

  So, number of milliseconds before the server is forcefully terminated.
  Default is `5000`

- **`DISHER_SERVER_SECRET`**
  The server secret is used to hash various things. If not set via `env` a
  random string will be generated the first time the server is started and then
  written to disk in `[etc path]/server-secret`

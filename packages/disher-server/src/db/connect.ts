import mongoose from 'mongoose'
import { yellow, cyan } from 'chalk'
import { Undefinable } from '../utils/types'
import { logger } from '../utils/log'

// See https://mongoosejs.com/docs/api.html#mongoose_Mongoose-set
mongoose.set('useFindAndModify', false)
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useCreateIndex', true)
mongoose.Promise = Promise

const { warn, error } = logger()

export interface ConnectOptions {
  host: string
  retries: number
}

async function wait(n: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, n * 1000))
}

async function lowConnect(
  { host, retries }: ConnectOptions,
  nRetry = 0
): Promise<Undefinable<mongoose.Connection>> {
  try {
    const goose = await mongoose.connect(host)
    const con = goose.connection
    con.on('open', () => console.log(`Database connection open`))

    return con
  } catch (e) {
    error('MongoDB connect error:', e.message)

    if (nRetry < retries) {
      if (e.name === 'MongoNetworkError') {
        if (nRetry === 0) {
          warn(`${yellow('MongoDB connection failed.')} Retrying...`)
        }

        await wait(1)

        warn(`...retry ${cyan(nRetry + 1)}`)

        return lowConnect({ host, retries }, nRetry + 1)
      } else {
        return undefined
      }
    }
  }

  return undefined
}

export async function connectToDatabase(
  options: ConnectOptions
): Promise<Undefinable<mongoose.Connection>> {
  try {
    const c = await lowConnect(options)
    return c
  } catch (e) {
    console.error('dn connect error:', e)
    return undefined
  }
}

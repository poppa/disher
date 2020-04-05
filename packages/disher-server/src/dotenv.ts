import dotenv from 'dotenv'
import { yellow, cyan } from 'chalk'

try {
  dotenv.config()
} catch (e) {
  if (process.env.NODE_ENV !== 'production') {
    console.info(
      `${yellow('notice:')} No ${cyan(
        '.env'
      )} exist. Using default configuration`
    )
  }
}

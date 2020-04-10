// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserDocument } from './modules/user'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: UserDocument
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends UserDocument {}

    interface Session {
      user?: UserDocument
    }
  }
}

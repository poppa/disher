/**
 * Immediately save the session in `req`
 */
export const saveSession = async (req: Express.Request): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (req.session) {
      req.session.save((err) => (err ? reject(err) : resolve()))
    } else {
      resolve()
    }
  })
}

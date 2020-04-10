import jwt, {
  GetPublicKeyOrSecret,
  Secret,
  SignOptions,
  VerifyOptions,
} from 'jsonwebtoken'

/**
 * Sign the given payload into a JSON Web Token string
 *
 * @param payload - Payload to sign, could be an literal, buffer or string
 * @param secretOrPrivateKey - Either the secret for HMAC algorithms,
 *  or the PEM encoded private key for RSA and ECDSA.
 * @param options - Options for the signature
 * @returns - The JSON Web Token string
 */
export async function sign(
  payload: string | object | Buffer,
  secret: Secret,
  options?: SignOptions
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    try {
      jwt.sign(payload, secret, options || {}, (err, res) => {
        err ? reject(err) : resolve(res)
      })
    } catch (e) {
      reject(e)
    }
  })
}

/**
 * Verify given token using a secret or a public key to get a decoded token
 * @param token - JWT string to verify
 * @param secretOrPublicKey - Either the secret for HMAC algorithms, or the
 *  PEM encoded public key for RSA and ECDSA.
 * @param options - Options for the verification
 * @returns - The decoded token.
 */
export async function verify<R = string | object>(
  token: string,
  secretOrPublicKey: string | Buffer | GetPublicKeyOrSecret,
  options?: VerifyOptions
): Promise<R> {
  return new Promise<R>((resolve, reject) => {
    try {
      jwt.verify(token, secretOrPublicKey, options || {}, (err, res) => {
        if (err) {
          return reject(err)
        }

        if (typeof res !== undefined) {
          return resolve((res as unknown) as R)
        }

        return reject(new Error('Undefined result from jwt.verify()'))
      })
    } catch (e) {
      reject(e)
    }
  })
}

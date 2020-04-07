export type Scope = 'user' | 'moderator' | 'admin'

/**
 * List of existing scopes
 */
export const Scopes: Readonly<Scope[]> = Object.freeze([
  'user',
  'moderator',
  'admin',
])

/**
 * Check that `scope` is an existing scope
 */
export function isScope(scope: string): scope is Scope {
  return Scopes.includes(scope as Scope)
}

/**
 * Validate a scope or scopes
 *
 * @param scope - The requested scope/s
 * @param requiredScope - The required scope/s
 *
 * @example
 * const userScope = ['user']
 * const reqScope = ['admin']
 * validateScope(userScope, reqScope) // -> false
 *
 * @example
 * const userScope = ['moderator']
 * const reqScope = ['admin', 'moderator']
 * validateScope(userScope, reqScope) // -> true
 *
 */
export function validateScope(
  scope: string[],
  requiredScope: Scope[]
): boolean {
  return requiredScope.every((rs) => scope.includes(rs))
}

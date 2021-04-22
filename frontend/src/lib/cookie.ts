export function parse(cookies: string): Record<string, string> {
  const res: Record<string, string> = {}
  const lines = cookies.split(/;\s*/).map((c) => c.split('='))

  for (const [key, ...rest] of lines) {
    res[key] = rest.join('=')
  }

  return res
}

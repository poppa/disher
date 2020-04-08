export function stripCwd(path: string, extra = 0): string {
  const cwd = process.cwd()

  if (path.length > cwd.length + extra) {
    return path.substring(cwd.length + extra)
  }

  return path
}

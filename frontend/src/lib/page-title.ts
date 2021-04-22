export function pageTitle(title?: string): string {
  const a: string[] = title ? [title] : []
  a.push((import.meta.env.VITE_SITE_NAME as string) || 'Disher')

  return a.join(' • ')
}

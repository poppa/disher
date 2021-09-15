import StockUserImage from '../svg/stock-user.svg'

export function pageTitle(title?: string): string {
  const a: string[] = title ? [title] : []
  a.push((import.meta.env.VITE_SITE_NAME as string) || 'Disher')

  return a.join(' • ')
}

export function resovleUserProfileImage(
  profile: Record<string, string>
): string {
  if (profile.gravatar) {
    return profile.gravatar
  } else if (profile.avatar) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return profile.avatar.url
  } else {
    return StockUserImage
  }
}

export function isModerator(user: Record<string, unknown>): boolean {
  // FIXME: We need a proper user type
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return user.role.name === 'Moderator'
}

export function stringToDate(strDate: string | undefined): Date {
  if (!strDate) {
    return new Date()
  }

  return new Date(Date.parse(strDate))
}

const DEFAULT_FILENAME = 'access.log'

const padUnits = (num) => num > 9 ? '' : '0'

export const dailyFilenameGenerator = (time) => {
  if (!time) {
    return DEFAULT_FILENAME
  }

  const year = time.getFullYear()
  const month = padUnits(time.getMonth() + 1)
  const day = padUnits(time.getDate() + 1)

  return `${year}-${month}-${day}-access.log`
}

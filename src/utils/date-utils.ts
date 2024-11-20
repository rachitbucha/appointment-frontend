import moment from 'moment-timezone'

export function formatTo12HourTime(dateString: string, timezone: string): string {
  const dateInTimezone = moment.tz(dateString, timezone)

  const hours = dateInTimezone.hours()
  const minutes = dateInTimezone.minutes()

  const period = hours >= 12 ? 'PM' : 'AM'

  const hour12 = hours % 12 || 12
  const minutePadded = minutes.toString().padStart(2, '0')

  return `${hour12}:${minutePadded} ${period}`
}

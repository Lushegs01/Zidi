export interface Timezone {
  label: string
  utcOffset: number
  value: string
}

export const timezones: Timezone[] = [
  { label: 'GMT / London (UK) — UTC+0', utcOffset: 0, value: 'GMT' },
  { label: 'BST / London Summer (UK) — UTC+1', utcOffset: 1, value: 'BST' },
  { label: 'Eastern Time — ET (US/Canada) — UTC−5', utcOffset: -5, value: 'ET' },
  { label: 'Central Time — CT (US/Canada) — UTC−6', utcOffset: -6, value: 'CT' },
  { label: 'Mountain Time — MT (US/Canada) — UTC−7', utcOffset: -7, value: 'MT' },
  { label: 'Pacific Time — PT (US/Canada) — UTC−8', utcOffset: -8, value: 'PT' },
  { label: 'West Africa Time — WAT (Nigeria) — UTC+1', utcOffset: 1, value: 'WAT' },
  { label: 'Central European Time — CET — UTC+1', utcOffset: 1, value: 'CET' },
]

/**
 * Generate time slots based on tutor availability (8am–10pm WAT = UTC+1)
 */
export function generateTimeSlots(utcOffset: number): Array<{
  label: string
  localDisplay: string
  watDisplay: string
  available: boolean
}> {
  const watStart = 8
  const watEnd = 23 // last slot starts at 22 (10pm WAT)
  const diff = utcOffset - 1 // local = WAT + diff

  const slots = []
  for (let watH = watStart; watH < watEnd; watH++) {
    const localH = watH + diff
    const watAMPM = watH < 12 ? 'am' : 'pm'
    const watHDisp = watH > 12 ? watH - 12 : watH === 0 ? 12 : watH
    const watDisplay = `${watHDisp}${watAMPM}`
    const localDisplay = formatHour(localH)
    const label = Math.round(diff) !== 0 ? `${localDisplay} (${watDisplay} WAT)` : localDisplay

    slots.push({
      label,
      localDisplay,
      watDisplay,
      available: localH >= 0 && localH < 24,
    })
  }
  return slots
}

function formatHour(h: number): string {
  const clamped = ((h % 24) + 24) % 24
  const ampm = clamped < 12 ? 'am' : 'pm'
  const disp = clamped === 0 ? 12 : clamped > 12 ? clamped - 12 : clamped
  return `${disp}${ampm}`
}

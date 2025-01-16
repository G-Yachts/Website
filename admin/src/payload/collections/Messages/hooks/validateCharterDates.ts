import type { Payload } from 'payload'

import type { Message } from '../../../payload-types'

export const validateCharertDates = async (
  _: any,
  {
    data,
    payload,
  }: {
    data: Message
    payload: Payload
  },
) => {
  if (!payload) return true
  if (data.type !== 'charter') return true
  if (!data.charterDates.from || !data.charterDates.to)
    return 'Both start and end dates are required'
  if (new Date(data.charterDates.from) > new Date(data.charterDates.to)) {
    return 'The start date must be before the end date'
  }

  const { reservations } = await payload.findByID({
    collection: 'charters',
    id: typeof data.charter === 'string' ? data.charter : data.charter.id.toString(),
  })

  // Check if the new reservation overlaps with any existing reservations
  const from = new Date(data.charterDates.from).getTime()
  const to = new Date(data.charterDates.to).getTime()
  for (let i = 0; i < reservations.length; i++) {
    if (
      (new Date(reservations[i].from).getTime() <= from &&
        from <= new Date(reservations[i].to).getTime()) ||
      (new Date(reservations[i].from).getTime() <= to &&
        to <= new Date(reservations[i].to).getTime())
    ) {
      return 'Reservations cannot overlap'
    }
  }
  return true
}

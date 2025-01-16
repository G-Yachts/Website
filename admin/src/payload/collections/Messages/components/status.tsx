import React from 'react'
import { useFieldType, useFormFields } from 'payload/components/forms'
import { useAuth } from 'payload/components/utilities'

import { User } from '../../../payload-types'

export default function Status({ path, validate }) {
  const { value = '', setValue } = useFieldType({
    path,
    validate,
  })
  const { user } = useAuth<User>()
  const userField = useFormFields(([fields, dispatch]) => fields.user)

  if (value === 'pending') {
    return <span style={{ color: 'orange', fontSize: '1.5em' }}>Pending</span>
  }
  if (value === 'fulfilled') {
    return <span style={{ color: 'blue', fontSize: '1.5em' }}>Fulfilled</span>
  }
  if (value === 'claimed' && userField.value === user.id) {
    return <span style={{ color: 'green', fontSize: '1.5em' }}>Claimed by you</span>
  }
  if (value === 'claimed') {
    return <span style={{ color: 'red', fontSize: '1.5em' }}>Claimed by another user</span>
  }

  return <span style={{ color: 'black', fontSize: '1.5em' }}>Unknown status</span>
}
